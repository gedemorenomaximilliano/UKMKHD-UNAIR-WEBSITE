# Panduan Deploy — UKMKHD UNAIR Website

Website ini di-deploy ke **Vercel** (paket **Hobby / gratis**) dan terhubung otomatis
dengan repository GitHub, jadi **cukup `git push`** untuk merilis perubahan.

## Info Produksi

| Item | Nilai |
| --- | --- |
| URL produksi | https://ukmkhd-unair-website.vercel.app |
| Dashboard proyek | https://vercel.com/gede-moreno-maximillianos-projects/ukmkhd-unair-website |
| Repository | https://github.com/gedemorenomaximilliano/UKMKHD-UNAIR-WEBSITE |
| Branch produksi | `main` |
| Framework | Next.js 14 (App Router) |
| Build command | `npm run build` (otomatis terdeteksi) |
| Environment variables | tidak ada |
| Paket | Hobby (gratis, tanpa kartu kredit) |

## Alur Deploy Otomatis

```
edit kode → git commit → git push origin main
                              │  (webhook GitHub)
                              ▼
                 Vercel menjalankan `next build` (±30 detik)
                              │
                              ▼
        URL deployment baru  …-xxxxx.vercel.app   (permanen, tidak berubah)
                              │
                              ▼
        alias produksi       ukmkhd-unair-website.vercel.app  (dipindah otomatis)
```

Setiap commit menghasilkan satu deployment baru. Deployment lama **tidak dihapus**,
jadi riwayat rilis bisa dilihat dan dikembalikan kapan saja di tab *Deployments*.

## Deploy Harian (paling sering dipakai)

```powershell
git add .
git commit -m "update: halaman program kerja"
git push origin main
```

Selesai. Cek status build di dashboard Vercel atau jalankan `vercel ls`.

### Preview sebelum masuk produksi

Jangan push ke `main` kalau belum yakin. Buat branch, push, lalu bagikan URL preview:

```powershell
git checkout -b mobile-fix
git add .
git commit -m "fix: layout mobile kalender"
git push origin mobile-fix
```

Vercel membuat URL preview khusus (tidak mengganggu produksi). Setelah disetujui,
merge ke `main` lewat Pull Request — produksi baru ikut ter-update.

## Deploy Manual lewat CLI (jika perlu)

Prasyarat: Node.js dan akses ke akun Vercel yang memiliki proyek ini.

```powershell
npm install -g vercel   # sekali saja
vercel login            # ikuti tautan device code di browser
vercel link --yes --project ukmkhd-unair-website
vercel deploy --prod    # rilis ke produksi
```

- `vercel deploy` tanpa `--prod` = preview (aman untuk uji coba).
- File `.vercel/project.json` menyimpan tautan proyek dan **tidak** di-commit
  (sudah masuk `.gitignore`), jadi setiap orang perlu `vercel link` sekali.

## Rollback

**Lewat dashboard:** Deployments → pilih deployment lama yang statusnya *Ready* →
menu `⋯` → **Promote to Production**.

**Lewat CLI:**

```powershell
vercel rollback          # kembali ke deployment produksi sebelumnya
vercel ls                # daftar deployment + status
```

## Domain Kustom (opsional, gratis)

Hosting tetap gratis; hanya pembelian domain yang berbayar.

```powershell
vercel domains add namadomain.com
```

Lalu ikuti instruksi DNS yang muncul:

- **Paling mudah:** ganti nameserver domain ke nameserver Vercel.
- **Alternatif:** tambah record `A` untuk domain utama dan `CNAME` `www` →
  `cname.vercel-dns.com`.

SSL/HTTPS diterbitkan otomatis. Setelah domain aktif, tambahkan juga di
**Settings → Domains** agar alias produksi memakai domain tersebut.

## Environment Variables

Saat ini website **tidak memakai** environment variable apa pun. Kalau nanti perlu
(misalnya API key):

1. Vercel → Project → **Settings → Environment Variables** → tambahkan untuk
   *Production*, *Preview*, dan *Development*.
2. Di lokal, simpan di `.env.local` (sudah di-ignore, **jangan pernah di-commit**).
3. Ubah kode, push, lalu redeploy.

## Troubleshooting

**Build gagal di Vercel tapi lancar di lokal**
Jalankan `npm run build` di lokal dulu. Vercel memakai Node.js 26.x dan install
bersih (`npm install`), jadi error biasanya karena file belum di-commit atau
`package-lock.json` tidak ikut ter-push.

**Halaman tampil 404 setelah deploy**
Pastikan file ada di `src/app/...` dan nama file mengikuti konvensi Next.js
(`page.tsx`). Cek juga build log: route yang berhasil akan muncul dengan tanda `○`.

**Deploy tidak terpicu setelah `git push`**
- Pastikan push ke branch `main` (branch lain hanya membuat preview).
- Cek **Settings → Git** di dashboard: repo harus `UKMKHD-UNAIR-WEBSITE`,
  production branch `main`.
- Cek webhook: GitHub → repo → **Settings → Webhooks** → ada hook Vercel
  dengan status 200. Kalau merah, klik *Redeliver*.

**`You need to add a Login Connection to your GitHub account first`**
Akun Vercel harus punya GitHub sebagai metode login: buka
https://vercel.com/account/settings → **Sign-in Methods / Authentication** →
**Connect GitHub** → authorize, lalu beri akses repo di
https://github.com/apps/vercel.

**`This email is already associated with another account`**
Email GitHub tersebut sudah terpakai di akun Vercel lain. Jangan buat akun baru —
pilih salah satu: pakai akun lama tersebut untuk proyek ini, atau lepaskan GitHub
dari akun lama (Settings → Sign-in Methods → Disconnect) lalu sambungkan ke akun
yang sekarang.

**Ingin mengecek website tanpa membuka browser**

```powershell
vercel curl https://ukmkhd-unair-website.vercel.app
```

**Deployment terkunci (perlu login untuk melihat)**
Cek **Settings → Deployment Protection**. Untuk situs publik, produksi harus bisa
diakses tanpa login; preview boleh tetap diproteksi.

## Batas Paket Hobby (gratis)

- Bandwidth ±100 GB/bulan — situs statis ini hanya memakai sebagian sangat kecil.
- Semua halaman di-prerender (statis), jadi cepat dan murah.
- Untuk penggunaan non-komersial (organisasi mahasiswa) — sesuai ketentuan Hobby.
- Butuh analitik/limit lebih besar → upgrade Pro (berbayar), tidak wajib.

## Catatan Aset

Total `public/` saat ini ±15 MB. Sekitar **8,3 MB tidak dipakai** oleh kode dan
tetap ikut ter-upload setiap deploy:

- `public/assets/Design references/` (4 JPG, ±7,5 MB — mockup desain)
- `public/assets/color palette/` (2 PNG)
- `public/assets/element/Vector 15, 16, 18, 19, 20, 21.png`
- `public/assets/3d/logo-kabinet.glb`

Kalau tidak diperlukan di runtime, pindahkan ke folder di luar `public/`
(misalnya `design/`) agar deploy lebih ringan. Jangan hapus jika masih dipakai
sebagai referensi desain.

## Checklist Rilis

- [ ] `npm run build` sukses di lokal
- [ ] Tidak ada file `.env.local` / token yang ikut ter-commit
- [ ] Sudah dicek tampilan mobile dan desktop
- [ ] `git push origin main`
- [ ] Deployment berstatus **Ready** dan URL produksi mengembalikan 200
