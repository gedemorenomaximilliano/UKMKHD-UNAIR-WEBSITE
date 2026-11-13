"use client";

import React, { useState } from "react";
import { BookOpen, Clock, User, ArrowRight, Sparkles, Feather, X } from "lucide-react";

interface ArticleItem {
  id: string;
  category: "Mata Dharma" | "Sloka of the Day" | "Kisah Kita" | "Rekap Kegiatan";
  title: string;
  excerpt: string;
  author: string;
  authorRole: string;
  date: string;
  readTime: string;
  color: string;
  accentBg: string;
  content: string;
}

export default function LatestArticles() {
  const [activeArticle, setActiveArticle] = useState<ArticleItem | null>(null);

  const articles: ArticleItem[] = [
    {
      id: "mata-dharma-tri-hita-karana",
      category: "Mata Dharma",
      title: "Menyelami Esensi Tri Hita Karana dalam Dinamika Kampus Masa Kini",
      excerpt:
        "Bagaimana mahasiswa Hindu merawat keharmonisan hubungan dengan Sang Pencipta, sesama sivitas akademika, dan kelestarian lingkungan kampus.",
      author: "Divisi Kerohanian & Medkraf",
      authorRole: "Tim Redaksi UKMKHD",
      date: "10 November 2026",
      readTime: "4 mnt baca",
      color: "text-[#c1111e]",
      accentBg: "bg-[#f86b74]/15 border-[#f86b74]/30",
      content: `Tri Hita Karana mengajarkan bahwa kebahagiaan sejati bertumpu pada tiga keharmonisan: Parahyangan (hubungan harmonis dengan Tuhan), Pawongan (hubungan harmonis antarsesama manusia), dan Palemahan (hubungan harmonis dengan alam lingkungan). Di tengah kesibukan kuliah, praktikum, dan organisasi di Universitas Airlangga, penerapan konsep ini menjadi kompas moral bagi setiap mahasiswa. Mengawali hari dengan doa, saling menyapa dengan rasa asah-asih-asuh di ruang himpunan, serta menjaga kebersihan lingkungan kampus MERR-C maupun Dharmawangsa-B adalah wujud nyata laku Dharma yang bersahaja.`,
    },
    {
      id: "sloka-bhagavad-gita-karmanye",
      category: "Sloka of the Day",
      title: "Bhagavad Gita II.47: Melayani Tanpa Terikat Pamrih dalam Berorganisasi",
      excerpt:
        "Karmany evadhikaras te ma phalesu kadacana — refleksi mendalam tentang dedikasi tulus seorang pengurus dalam mengemban amanah kabinet.",
      author: "Komang Raditya",
      authorRole: "Biro Kerohanian",
      date: "5 November 2026",
      readTime: "3 mnt baca",
      color: "text-[#023048]",
      accentBg: "bg-[#8bd4ff]/25 border-[#8bd4ff]/40",
      content: `Karmanye vadhikaraste ma phaleshu kadachana, ma karma-phala-hetur bhur ma te sango 'stv akarmani. Sloka termasyhur ini mengingatkan kita bahwa hak kita adalah menjalankan kewajiban dengan sebaik-baiknya, bukan menuntut hasil ataupun menjadi pasif tanpa berbuat sesuatu. Dalam konteks kepengurusan Kabinet Nivaramitra, setiap divisi bekerja bukan demi tepuk tangan semata, melainkan sebagai persembahan yajna bagi kemajuan organisasi dan pengabdian tulus kepada umat sedharma.`,
    },
    {
      id: "kisah-kita-upgrading-nivaramitra",
      category: "Kisah Kita",
      title: "Hangatnya Langkah Awal: Jejak Upgrading Pengurus Nivaramitra 2026",
      excerpt:
        "Kilas balik kebersamaan, perumusan grand design, dan tawa yang menyatukan tekad dua belas bulan ke depan.",
      author: "Ni Putu Saraswati",
      authorRole: "Divisi Ikatan Keluarga",
      date: "28 Oktober 2026",
      readTime: "5 mnt baca",
      color: "text-[#770101]",
      accentBg: "bg-[#fbead1] border-[#fbead1]",
      content: `Minggu lalu menjadi tonggak bermulanya perjalanan Kabinet Nivaramitra. Seluruh pengurus dari BPH, Departemen Internal, hingga Departemen Eksternal berkumpul untuk menyatukan visi dalam sesi Upgrading dan Malam Keakraban. Bukan sekadar menyusun timeline program kerja seperti NIRWANA atau Mahabharata, tetapi yang terpenting adalah mengikat rasa persaudaraan agar setiap langkah yang ditempuh selalu diselimuti afeksi dan solidaritas sejati.`,
    },
  ];

  return (
    <section id="artikel" className="relative py-24 bg-white overflow-hidden">
      {/* Background Subtle Gradient & Ornaments */}
      <div className="absolute right-0 top-1/4 w-80 h-80 bg-[#8bd4ff]/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute left-0 bottom-1/4 w-80 h-80 bg-[#f86b74]/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#023048]/10 text-[#023048] font-subheading text-xs font-bold mb-3 border border-[#023048]/20">
              <Feather className="w-3.5 h-3.5 text-[#c1111e]" />
              <span>Media Kreatif UKMKHD</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#023048] tracking-tight">
              Artikel & Tulisan Terbaru
            </h2>
            <p className="font-body text-sm sm:text-base text-[#023048]/75 mt-1.5 max-w-xl">
              Ruang publikasi pemikiran, kajian dharma, dan kisah kebersamaan yang ditulis oleh anggota keluarga besar UKMKHD UNAIR.
            </p>
          </div>

          <div className="text-xs sm:text-sm font-subheading font-medium text-[#659aba] self-start md:self-end">
            Platform Media Kreatif · Proker 2026
          </div>
        </div>

        {/* 3 Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {articles.map((item) => (
            <article
              key={item.id}
              className="liquid-glass-card rounded-3xl p-6 sm:p-7 flex flex-col justify-between border relative group"
            >
              <div>
                {/* Meta Header */}
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`font-subheading text-[11px] font-bold px-3 py-1 rounded-full border ${item.accentBg} ${item.color}`}
                  >
                    {item.category}
                  </span>

                  <div className="flex items-center gap-1 text-[11px] font-body text-[#659aba]">
                    <Clock className="w-3 h-3" />
                    <span>{item.readTime}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-heading text-xl font-bold text-[#023048] mb-3 leading-snug group-hover:text-[#c1111e] transition-colors">
                  {item.title}
                </h3>

                {/* Excerpt */}
                <p className="font-body text-xs sm:text-sm text-[#023048]/75 mb-6 line-clamp-3 leading-relaxed">
                  {item.excerpt}
                </p>
              </div>

              {/* Author & Footer Action */}
              <div className="pt-4 border-t border-[#659aba]/15 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#023048]/10 flex items-center justify-center text-[#023048] font-heading font-bold text-xs">
                    {item.author.charAt(0)}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-subheading text-xs font-bold text-[#023048] leading-tight">
                      {item.author}
                    </span>
                    <span className="font-body text-[10px] text-[#659aba]">
                      {item.date}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setActiveArticle(item)}
                  className="p-2 rounded-xl bg-slate-50 hover:bg-[#c1111e] text-[#023048] hover:text-white transition-all group-hover:shadow-xs"
                  aria-label="Baca Artikel"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </article>
          ))}
        </div>

      </div>

      {/* Article Reader Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#023048]/65 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-white/80">
            <button
              onClick={() => setActiveArticle(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-[#023048] transition-colors"
              aria-label="Tutup"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-3">
              <span
                className={`font-subheading text-xs font-bold px-3 py-1 rounded-full border ${activeArticle.accentBg} ${activeArticle.color}`}
              >
                {activeArticle.category}
              </span>
              <span className="font-body text-xs text-[#659aba]">
                {activeArticle.date} · {activeArticle.readTime}
              </span>
            </div>

            <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[#023048] mb-4 leading-snug">
              {activeArticle.title}
            </h3>

            <div className="flex items-center gap-3 pb-6 mb-6 border-b border-slate-200">
              <div className="w-10 h-10 rounded-full bg-[#023048] text-white flex items-center justify-center font-heading font-bold text-sm">
                {activeArticle.author.charAt(0)}
              </div>
              <div>
                <p className="font-subheading text-xs font-bold text-[#023048]">
                  {activeArticle.author}
                </p>
                <p className="font-body text-[11px] text-[#659aba]">
                  {activeArticle.authorRole}
                </p>
              </div>
            </div>

            <div className="font-body text-sm sm:text-base text-[#023048]/85 leading-relaxed space-y-4 mb-8">
              <p>{activeArticle.content}</p>
            </div>

            <div className="pt-4 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setActiveArticle(null)}
                className="px-6 py-2.5 rounded-xl bg-[#023048] font-subheading text-xs font-bold text-white hover:bg-[#c1111e] transition-colors"
              >
                Selesai Membaca
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
