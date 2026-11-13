"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Sparkles } from "lucide-react";

interface Hero3DFlameProps {
  modelPath?: string;
  heightClass?: string;
  scale?: number;
  accent?: "flame" | "ukm";
}

export default function Hero3DFlame({
  modelPath = "/assets/3d/logo-kabinet-ukm.glb",
  heightClass = "h-[380px] sm:h-[430px] lg:h-[470px]",
  scale = 2.92,
  accent = "flame",
}: Hero3DFlameProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    setLoading(true);

    // Dimensions
    let width = container.clientWidth || 400;
    let height = container.clientHeight || 450;

    // 1. Scene
    const scene = new THREE.Scene();

    // 2. Camera: Positioned straight on Z axis with aspect-ratio adaptive distance
    const baseZ = 4.92;
    const modelAspect = 0.865;
    const aspect = width / height;
    const initialZ = baseZ * (aspect < modelAspect ? modelAspect / aspect : 1);
    const camera = new THREE.PerspectiveCamera(38, aspect, 0.1, 100);
    camera.position.set(0, 0, initialZ);

    // 3. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    // Append canvas to container
    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    // 4. OrbitControls: Restricted angles so it always stays straight and upright
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.enableZoom = false; // Prevent interfering with page scroll
    controls.enablePan = false;
    controls.autoRotate = false; // No continuous spin
    // Strict angle boundaries to prevent skewing / upside-down tilt
    controls.minPolarAngle = Math.PI * 0.44;
    controls.maxPolarAngle = Math.PI * 0.56;
    controls.minAzimuthAngle = -Math.PI * 0.22;
    controls.maxAzimuthAngle = Math.PI * 0.22;

    // 5. Lighting Setup tailored to accent
    const ambientLight = new THREE.AmbientLight(0xffffff, accent === "ukm" ? 1.5 : 1.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.6);
    keyLight.position.set(3, 4, 5);
    scene.add(keyLight);

    if (accent === "ukm") {
      // Warm golden glow + cool cyan backlight for UKMKHD logo
      const goldLight = new THREE.PointLight(0xffb703, 1.2, 15);
      goldLight.position.set(-3, -1, 3);
      scene.add(goldLight);

      const blueLight = new THREE.PointLight(0x38bdf8, 1.1, 15);
      blueLight.position.set(3, 2, -2);
      scene.add(blueLight);

      const rimLight = new THREE.DirectionalLight(0xffeedd, 1.4);
      rimLight.position.set(0, 5, -3);
      scene.add(rimLight);
    } else {
      // Flame red & cool sky blue for Kabinet Nivaramitra logo
      const flameLight = new THREE.PointLight(0xff4455, 1.0, 15);
      flameLight.position.set(-3, -1, 3);
      scene.add(flameLight);

      const blueLight = new THREE.PointLight(0x38bdf8, 1.3, 15);
      blueLight.position.set(3, 2, -2);
      scene.add(blueLight);

      const rimLight = new THREE.DirectionalLight(0xffd5dc, 1.4);
      rimLight.position.set(0, 5, -3);
      scene.add(rimLight);
    }

    // 6. Model Loading, Centering & Orientation
    // Outer pivot for mouse parallax and gentle hover
    const pivot = new THREE.Group();
    scene.add(pivot);

    // Inner group to hold the straight centered model
    const modelGroup = new THREE.Group();
    pivot.add(modelGroup);

    const loader = new GLTFLoader();
    let isMounted = true;

    loader.load(
      modelPath,
      (gltf) => {
        if (!isMounted) return;

        const model = gltf.scene;

        model.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            mesh.castShadow = false;
            mesh.receiveShadow = false;

            if (mesh.material) {
              const mat = mesh.material as THREE.MeshStandardMaterial;
              mat.side = THREE.DoubleSide;
              mat.needsUpdate = true;
            }
          }
        });

        // 1. Calculate raw geometric center of the mesh
        const rawBox = new THREE.Box3().setFromObject(model);
        const rawCenter = rawBox.getCenter(new THREE.Vector3());

        // Center the model at local origin
        model.position.sub(rawCenter);

        // 2. Rotate model by -90° (-Math.PI / 2) so its front face (+X in raw mesh) faces directly forward (+Z towards camera)
        model.rotation.y = -Math.PI / 2;

        modelGroup.add(model);

        // 3. Compute final upright box and scale
        const finalBox = new THREE.Box3().setFromObject(modelGroup);
        const finalSize = finalBox.getSize(new THREE.Vector3());
        const maxDim = Math.max(finalSize.x, finalSize.y, finalSize.z);

        const targetScale = scale / maxDim;
        pivot.scale.setScalar(targetScale);

        setLoading(false);
      },
      undefined,
      (error) => {
        console.error("Error loading 3D logo:", error);
        setLoading(false);
      }
    );

    // 7. Subtle, Refined Parallax on Mouse Move (Max ~6° tilt, perfectly straight when centered)
    let targetRotX = 0;
    let targetRotY = 0;
    let currentRotX = 0;
    let currentRotY = 0;
    let isUserDragging = false;

    const handlePointerDown = () => {
      isUserDragging = true;
    };

    const handlePointerUp = () => {
      isUserDragging = false;
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Calculate normalized cursor position relative to window center (-1 to 1)
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;

      // Gentle, subtle parallax tilt bounds (~5.7° horizontally, ~2.8° vertically)
      targetRotY = nx * 0.10;
      targetRotX = -ny * 0.05;
    };

    const handleMouseLeave = () => {
      // Smoothly return to 100% straight and upright when cursor leaves
      targetRotX = 0;
      targetRotY = 0;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    container.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointerup", handlePointerUp);

    // 8. Responsive Resizing
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || 400;
      height = container.clientHeight || 450;

      const currentAspect = width / height;
      camera.aspect = currentAspect;
      const targetZ = baseZ * (currentAspect < modelAspect ? modelAspect / currentAspect : 1);
      camera.position.setLength(targetZ);
      camera.updateProjectionMatrix();
      controls.update();

      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener("resize", handleResize);

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(container);

    // 9. Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth lerp parallax rotation when not manually dragging
      if (!isUserDragging) {
        currentRotY += (targetRotY - currentRotY) * 0.05;
        currentRotX += (targetRotX - currentRotX) * 0.05;
        pivot.rotation.y = currentRotY;
        pivot.rotation.x = currentRotX;
      }

      // Very subtle floating hover motion on Y axis (±0.02)
      pivot.position.y = Math.sin(elapsedTime * 1.5) * 0.02;

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // 10. Cleanup
    return () => {
      isMounted = false;
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
      resizeObserver.disconnect();
      window.removeEventListener("pointerup", handlePointerUp);
      if (container) {
        container.removeEventListener("pointerdown", handlePointerDown);
      }
      controls.dispose();
      renderer.dispose();
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [modelPath, accent, scale]);

  return (
    <div
      className={`relative w-full ${heightClass} flex items-center justify-center rounded-2xl overflow-hidden select-none cursor-grab active:cursor-grabbing`}
    >
      {/* Three.js Canvas Injection Container */}
      <div
        ref={containerRef}
        className="w-full h-full flex items-center justify-center"
      />

      {/* Loading State Spinner */}
      {loading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#021724]/40 backdrop-blur-sm z-20 transition-opacity">
          <div className="relative w-14 h-14 flex items-center justify-center">
            <div
              className={`absolute inset-0 rounded-full border-2 ${
                accent === "ukm"
                  ? "border-[#8bd4ff]/30 border-t-[#8bd4ff]"
                  : "border-[#ff3b4e]/30 border-t-[#ff3b4e]"
              } animate-spin`}
            />
            <Sparkles
              className={`w-6 h-6 ${
                accent === "ukm" ? "text-[#ffd166]" : "text-[#8bd4ff]"
              } animate-pulse`}
            />
          </div>
          <span className="mt-3 font-subheading text-xs font-medium text-white/80 tracking-wider">
            Memuat Model 3D...
          </span>
        </div>
      )}
    </div>
  );
}
