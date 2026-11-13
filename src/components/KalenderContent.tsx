"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import { 
  ChevronLeft, 
  ChevronRight, 
  ChevronDown,
  Calendar as CalendarIcon, 
  Search,
  X,
  Sparkles,
  Info,
  Clock
} from "lucide-react";
import LiquidGlassCard from "./LiquidGlassCard";
import AnimatedBackground from "./AnimatedBackground";

export interface HolyDayEvent {
  id: string;
  dateStr: string;
  dayName: string;
  dateNum: number;
  month: number; // 1-12
  year: number;
  title: string;
  shortTitle?: string;
  category: "utama" | "purnama-tilem" | "pawukon";
  wukuOrSasih: string;
  description: string;
  rituals: string[];
  isNationalHoliday?: boolean;
}

// Curated authentic database for 2026 and 2027 + dynamic Pawukon/Lunar generation for any other year
const BASE_EVENTS_2026: HolyDayEvent[] = [
  // Januari 2026
  {
    id: "2026-01-03",
    dateStr: "Sabtu, 3 Januari 2026",
    dayName: "Sabtu",
    dateNum: 3,
    month: 1,
    year: 2026,
    title: "Purnama Sasih Kapitu",
    shortTitle: "Purnama Kapitu",
    category: "purnama-tilem",
    wukuOrSasih: "Sasih Kapitu",
    description: "Hari suci bulan purnama ke-7 memohon berkah kesucian rohani kepada Sang Hyang Chandra dan Sang Hyang Siwa.",
    rituals: ["Persembahyangan Purnama", "Penyucian Diri", "Kidung Suci"],
  },
  {
    id: "2026-01-17",
    dateStr: "Sabtu, 17 Januari 2026",
    dayName: "Sabtu",
    dateNum: 17,
    month: 1,
    year: 2026,
    title: "Hari Suci Siwaratri",
    shortTitle: "Hari Siwaratri",
    category: "utama",
    wukuOrSasih: "Saniscara Wage Tambir (Purwaning Tilem Sasih Kapitu)",
    description: "Malam perenungan dosa dan kebangkitan kesadaran batin (Jagra). Umat Hindu melaksanakan Mona Brata (keheningan), Upawasa (puasa), dan Jagra (tidak tidur semalam suntuk).",
    rituals: ["Mona Brata (Hening)", "Upawasa (Puasa)", "Jagra Semalam Suntuk", "Persembahyangan 4 Sesi"],
  },
  {
    id: "2026-01-18",
    dateStr: "Minggu, 18 Januari 2026",
    dayName: "Minggu",
    dateNum: 18,
    month: 1,
    year: 2026,
    title: "Tilem Sasih Kapitu",
    shortTitle: "Tilem Kapitu",
    category: "purnama-tilem",
    wukuOrSasih: "Sasih Kapitu",
    description: "Hari bulan mati untuk penyucian diri dari segala kekotoran rohani serta memohon perlindungan Sang Hyang Surya.",
    rituals: ["Persembahyangan Tilem", "Penyucian Spiritual"],
  },

  // Februari 2026
  {
    id: "2026-02-02",
    dateStr: "Senin, 2 Februari 2026",
    dayName: "Senin",
    dateNum: 2,
    month: 2,
    year: 2026,
    title: "Purnama Sasih Kawulu",
    shortTitle: "Purnama Kawulu",
    category: "purnama-tilem",
    wukuOrSasih: "Sasih Kawulu",
    description: "Hari suci purnama ke-8 yang sarat akan energi keharmonisan kosmos dan rasa syukur atas karunia kehidupan.",
    rituals: ["Persembahyangan Purnama"],
  },
  {
    id: "2026-02-17",
    dateStr: "Selasa, 17 Februari 2026",
    dayName: "Selasa",
    dateNum: 17,
    month: 2,
    year: 2026,
    title: "Tilem Sasih Kawulu",
    shortTitle: "Tilem Kawulu",
    category: "purnama-tilem",
    wukuOrSasih: "Sasih Kawulu",
    description: "Hari suci tilem ke-8 sebagai persiapan rohani menjelang datangnya bulan Kesanga.",
    rituals: ["Persembahyangan Tilem"],
  },
  {
    id: "2026-02-21",
    dateStr: "Sabtu, 21 Februari 2026",
    dayName: "Sabtu",
    dateNum: 21,
    month: 2,
    year: 2026,
    title: "Tumpek Landep (Periode I)",
    shortTitle: "Tumpek Landep",
    category: "pawukon",
    wukuOrSasih: "Saniscara Kliwon Landep",
    description: "Pemujaan Sang Hyang Pasupati sebagai penajam budi pekerti, kearifan intelek, serta penyucian sarana teknologi/logam.",
    rituals: ["Pemujaan Sang Hyang Pasupati", "Penyucian Ketajaman Intelek"],
  },

  // Maret 2026
  {
    id: "2026-03-03",
    dateStr: "Selasa, 3 Maret 2026",
    dayName: "Selasa",
    dateNum: 3,
    month: 3,
    year: 2026,
    title: "Purnama Sasih Kesanga",
    shortTitle: "Purnama Kesanga",
    category: "purnama-tilem",
    wukuOrSasih: "Sasih Kesanga",
    description: "Purnama suci penanda rangkaian upacara Melasti menuju perayaan Tahun Baru Saka 1948.",
    rituals: ["Upacara Melasti ke Segara", "Penyucian Pratima"],
  },
  {
    id: "2026-03-18",
    dateStr: "Rabu, 18 Maret 2026",
    dayName: "Rabu",
    dateNum: 18,
    month: 3,
    year: 2026,
    title: "Tawur Agung Kesanga & Pengerupukan",
    shortTitle: "Tawur Kesanga",
    category: "utama",
    wukuOrSasih: "Tilem Sasih Kesanga (Purwaning Nyepi)",
    description: "Penyucian alam semesta (Bhuana Agung) dan diri (Bhuana Alit), dilanjutkan pawai ogoh-ogoh pembersihan energi negatif.",
    rituals: ["Tawur Kesanga", "Pawai Ogoh-Ogoh", "Pembersihan Pekarangan"],
    isNationalHoliday: true,
  },
  {
    id: "2026-03-19",
    dateStr: "Kamis, 19 Maret 2026",
    dayName: "Kamis",
    dateNum: 19,
    month: 3,
    year: 2026,
    title: "HARI RAYA NYEPI (TAHUN BARU SAKA 1948)",
    shortTitle: "Nyepi Saka 1948",
    category: "utama",
    wukuOrSasih: "Pananggal Apisan Sasih Kedasa (Tahun Baru Saka 1948)",
    description: "Puncak keheningan Tahun Baru Saka 1948. Umat Hindu melaksanakan Catur Brata Penyepian selama 24 jam penuh: Amati Geni, Amati Karya, Amati Lelungan, dan Amati Lelanguan.",
    rituals: ["Catur Brata Penyepian (24 Jam)", "Mulat Sarira / Introspeksi Total", "Samadhi & Meditasi"],
    isNationalHoliday: true,
  },
  {
    id: "2026-03-20",
    dateStr: "Jumat, 20 Maret 2026",
    dayName: "Jumat",
    dateNum: 20,
    month: 3,
    year: 2026,
    title: "Ngembak Geni & Dharma Santi",
    shortTitle: "Ngembak Geni",
    category: "utama",
    wukuOrSasih: "Pananggal Ping Kalih Sasih Kedasa",
    description: "Hari berakhirnya masa hening penyepian, dirangkai dengan saling memaafkan (Dharma Santi) dan mempererat persaudaraan.",
    rituals: ["Dharma Santi", "Kunjungan Kekeluargaan", "Saling Memaafkan"],
    isNationalHoliday: true,
  },
  {
    id: "2026-03-28",
    dateStr: "Sabtu, 28 Maret 2026",
    dayName: "Sabtu",
    dateNum: 28,
    month: 3,
    year: 2026,
    title: "Tumpek Uduh / Wariga (Pengatag)",
    shortTitle: "Tumpek Uduh",
    category: "pawukon",
    wukuOrSasih: "Saniscara Kliwon Wariga",
    description: "Hari pemujaan Sang Hyang Sangkara sebagai manifestasi pemelihara tumbuh-tumbuhan dan kelestarian alam semesta.",
    rituals: ["Pemujaan Sang Hyang Sangkara", "Doa Kesuburan Flora"],
  },

  // April 2026
  {
    id: "2026-04-02",
    dateStr: "Kamis, 2 April 2026",
    dayName: "Kamis",
    dateNum: 2,
    month: 4,
    year: 2026,
    title: "Purnama Sasih Kedasa",
    shortTitle: "Purnama Kedasa",
    category: "purnama-tilem",
    wukuOrSasih: "Sasih Kedasa",
    description: "Purnama Kedasa yang agung (Purnama Kadasa), hari agung pemujaan Sang Hyang Sadha Siwa.",
    rituals: ["Persembahyangan Purnama Kedasa", "Bhatara Turun Kabeh"],
  },
  {
    id: "2026-04-04",
    dateStr: "Sabtu, 4 April 2026",
    dayName: "Sabtu",
    dateNum: 4,
    month: 4,
    year: 2026,
    title: "HARI RAYA SARASWATI (PERIODE I)",
    shortTitle: "Hari Saraswati I",
    category: "utama",
    wukuOrSasih: "Saniscara Umanis Watugunung",
    description: "Hari turunnya ilmu pengetahuan suci. Pemujaan Sang Hyang Aji Saraswati, dewi kebijaksanaan, sastra, dan seni bagi mahasiswa.",
    rituals: ["Pemujaan Pustaka Suci & Kitab Wedha", "Sembahyang Bersama Mahasiswa", "Kajian Jnana"],
  },
  {
    id: "2026-04-05",
    dateStr: "Minggu, 5 April 2026",
    dayName: "Minggu",
    dateNum: 5,
    month: 4,
    year: 2026,
    title: "Banyu Pinaruh (Periode I)",
    shortTitle: "Banyu Pinaruh",
    category: "utama",
    wukuOrSasih: "Redite Paing Sinta",
    description: "Penyucian diri di sumber mata air suci atau laut pada pagi hari, memohon kejernihan pikiran pasca Saraswati.",
    rituals: ["Mandi Suci Pagi Hari", "Penyucian Rohani", "Makan Nasi Kuning"],
  },
  {
    id: "2026-04-08",
    dateStr: "Rabu, 8 April 2026",
    dayName: "Rabu",
    dateNum: 8,
    month: 4,
    year: 2026,
    title: "Hari Raya Pagerwesi (Periode I)",
    shortTitle: "Pagerwesi I",
    category: "utama",
    wukuOrSasih: "Buda Kliwon Sinta",
    description: "Memagari diri dengan keteguhan ilmu dharma kepada Sang Hyang Pramesti Guru agar terlindung dari godaan adharma.",
    rituals: ["Pemujaan Sang Hyang Pramesti Guru", "Penguatan Benteng Rohani"],
  },
  {
    id: "2026-04-17",
    dateStr: "Jumat, 17 April 2026",
    dayName: "Jumat",
    dateNum: 17,
    month: 4,
    year: 2026,
    title: "Tilem Sasih Kedasa",
    shortTitle: "Tilem Kedasa",
    category: "purnama-tilem",
    wukuOrSasih: "Sasih Kedasa",
    description: "Hari tilem ke-10 untuk penyucian batin berkala.",
    rituals: ["Persembahyangan Tilem"],
  },

  // Mei 2026
  {
    id: "2026-05-02",
    dateStr: "Sabtu, 2 Mei 2026",
    dayName: "Sabtu",
    dateNum: 2,
    month: 5,
    year: 2026,
    title: "Purnama Sasih Jyestha",
    shortTitle: "Purnama Jyestha",
    category: "purnama-tilem",
    wukuOrSasih: "Sasih Jyestha",
    description: "Purnama ke-11 dalam kalender sasih.",
    rituals: ["Persembahyangan Purnama"],
  },
  {
    id: "2026-05-16",
    dateStr: "Sabtu, 16 Mei 2026",
    dayName: "Sabtu",
    dateNum: 16,
    month: 5,
    year: 2026,
    title: "Tilem Sasih Jyestha",
    shortTitle: "Tilem Jyestha",
    category: "purnama-tilem",
    wukuOrSasih: "Sasih Jyestha",
    description: "Hari tilem ke-11 memohon perlindungan rohani.",
    rituals: ["Persembahyangan Tilem"],
  },
  {
    id: "2026-05-30",
    dateStr: "Sabtu, 30 Mei 2026",
    dayName: "Sabtu",
    dateNum: 30,
    month: 5,
    year: 2026,
    title: "Tumpek Krulut (Hari Kasih Sayang)",
    shortTitle: "Tumpek Krulut",
    category: "pawukon",
    wukuOrSasih: "Saniscara Kliwon Krulut",
    description: "Pemujaan Sang Hyang Iswara sebagai manifestasi keindahan seni tabuh gamelan dan kasih sayang antarsesama manusia.",
    rituals: ["Penyucian Alat Kesenian", "Ungkapan Kasih Sayang"],
  },

  // Juni 2026
  {
    id: "2026-06-01",
    dateStr: "Senin, 1 Juni 2026",
    dayName: "Senin",
    dateNum: 1,
    month: 6,
    year: 2026,
    title: "Purnama Sasih Sadha",
    shortTitle: "Purnama Sadha",
    category: "purnama-tilem",
    wukuOrSasih: "Sasih Sadha",
    description: "Purnama ke-12 penutup siklus sasih tahun Saka.",
    rituals: ["Persembahyangan Purnama"],
  },
  {
    id: "2026-06-16",
    dateStr: "Selasa, 16 Juni 2026",
    dayName: "Selasa",
    dateNum: 16,
    month: 6,
    year: 2026,
    title: "Penampahan Galungan",
    shortTitle: "Penampahan Galungan",
    category: "utama",
    wukuOrSasih: "Anggara Wage Dungulan",
    description: "Persiapan puncak Galungan dengan mendirikan penjor lambang Gunung Agung dan Naga Anantabhoga.",
    rituals: ["Pemasangan Penjor Galungan", "Menyucikan Diri dari Sang Kala Tiga"],
  },
  {
    id: "2026-06-17",
    dateStr: "Rabu, 17 Juni 2026",
    dayName: "Rabu",
    dateNum: 17,
    month: 6,
    year: 2026,
    title: "HARI RAYA GALUNGAN",
    shortTitle: "Hari Galungan",
    category: "utama",
    wukuOrSasih: "Buda Kliwon Dungulan",
    description: "Hari kemenangan kebajikan (Dharma) atas ketidakbenaran (Adharma). Pemujaan kepada Ida Sang Hyang Widhi dan para leluhur.",
    rituals: ["Persembahyangan Agung di Pura", "Pemberkatan Leluhur", "Dharma Santi"],
  },
  {
    id: "2026-06-18",
    dateStr: "Kamis, 18 Juni 2026",
    dayName: "Kamis",
    dateNum: 18,
    month: 6,
    year: 2026,
    title: "Umanis Galungan",
    shortTitle: "Umanis Galungan",
    category: "utama",
    wukuOrSasih: "Wraspati Umanis Dungulan",
    description: "Hari silaturahmi dan saling mengunjungi sanak saudara serta mempererat rasa persaudaraan.",
    rituals: ["Dharma Santi Antaranggota", "Kunjungan Kerabat"],
  },
  {
    id: "2026-06-26",
    dateStr: "Jumat, 26 Juni 2026",
    dayName: "Jumat",
    dateNum: 26,
    month: 6,
    year: 2026,
    title: "Penampahan Kuningan",
    shortTitle: "Penampahan Kuningan",
    category: "utama",
    wukuOrSasih: "Sukra Wage Kuningan",
    description: "Mempersiapkan sarana persembahyangan Kuningan seperti tamiang dan kolem.",
    rituals: ["Pemasangan Tamiang & Endongan"],
  },
  {
    id: "2026-06-27",
    dateStr: "Sabtu, 27 Juni 2026",
    dayName: "Sabtu",
    dateNum: 27,
    month: 6,
    year: 2026,
    title: "HARI RAYA KUNINGAN",
    shortTitle: "Hari Kuningan",
    category: "utama",
    wukuOrSasih: "Saniscara Kliwon Kuningan",
    description: "Permohonan anugerah ketenangan batin dan kemakmuran dari Sang Hyang Widhi dan para Dewata (sembahyang sebelum pukul 12.00 siang).",
    rituals: ["Persembahyangan Pagi (Sebelum Pk 12.00)", "Persembahan Nasi Kuning"],
  },
  {
    id: "2026-06-30",
    dateStr: "Selasa, 30 Juni 2026",
    dayName: "Selasa",
    dateNum: 30,
    month: 6,
    year: 2026,
    title: "Tilem Sasih Sadha",
    shortTitle: "Tilem Sadha",
    category: "purnama-tilem",
    wukuOrSasih: "Sasih Sadha",
    description: "Tilem penutup siklus sasih Sadha.",
    rituals: ["Persembahyangan Tilem"],
  },

  // Juli s/d Desember 2026
  {
    id: "2026-07-04",
    dateStr: "Sabtu, 4 Juli 2026",
    dayName: "Sabtu",
    dateNum: 4,
    month: 7,
    year: 2026,
    title: "Tumpek Kandang (Pemujaan Satwa)",
    shortTitle: "Tumpek Kandang",
    category: "pawukon",
    wukuOrSasih: "Saniscara Kliwon Uye",
    description: "Pemujaan Sang Hyang Rare Angon sebagai manifestasi pelindung satwa dan fauna yang membantu kelangsungan hidup manusia.",
    rituals: ["Penghormatan terhadap Satwa & Ekosistem"],
  },
  {
    id: "2026-07-30",
    dateStr: "Kamis, 30 Juli 2026",
    dayName: "Kamis",
    dateNum: 30,
    month: 7,
    year: 2026,
    title: "Purnama Sasih Kasa",
    shortTitle: "Purnama Kasa",
    category: "purnama-tilem",
    wukuOrSasih: "Sasih Kasa (Bulan Ke-1)",
    description: "Purnama pertama dalam kalender sasih baru.",
    rituals: ["Persembahyangan Purnama"],
  },
  {
    id: "2026-08-08",
    dateStr: "Sabtu, 8 Agustus 2026",
    dayName: "Sabtu",
    dateNum: 8,
    month: 8,
    year: 2026,
    title: "Tumpek Wayang",
    shortTitle: "Tumpek Wayang",
    category: "pawukon",
    wukuOrSasih: "Saniscara Kliwon Wayang",
    description: "Pemujaan Sang Hyang Iswara sebagai dewata seni wayang dan ruwatan rohani.",
    rituals: ["Penyucian Wayang & Peralatan Kesenian"],
  },
  {
    id: "2026-08-13",
    dateStr: "Kamis, 13 Agustus 2026",
    dayName: "Kamis",
    dateNum: 13,
    month: 8,
    year: 2026,
    title: "Tilem Sasih Kasa",
    shortTitle: "Tilem Kasa",
    category: "purnama-tilem",
    wukuOrSasih: "Sasih Kasa",
    description: "Hari suci tilem bulan pertama.",
    rituals: ["Persembahyangan Tilem"],
  },
  {
    id: "2026-08-28",
    dateStr: "Jumat, 28 Agustus 2026",
    dayName: "Jumat",
    dateNum: 28,
    month: 8,
    year: 2026,
    title: "Purnama Sasih Karo",
    shortTitle: "Purnama Karo",
    category: "purnama-tilem",
    wukuOrSasih: "Sasih Karo (Bulan Ke-2)",
    description: "Hari suci purnama sasih kedua.",
    rituals: ["Persembahyangan Purnama"],
  },
  {
    id: "2026-09-12",
    dateStr: "Sabtu, 12 September 2026",
    dayName: "Sabtu",
    dateNum: 12,
    month: 9,
    year: 2026,
    title: "Tilem Sasih Karo",
    shortTitle: "Tilem Karo",
    category: "purnama-tilem",
    wukuOrSasih: "Sasih Karo",
    description: "Hari tilem sasih kedua.",
    rituals: ["Persembahyangan Tilem"],
  },
  {
    id: "2026-09-27",
    dateStr: "Minggu, 27 September 2026",
    dayName: "Minggu",
    dateNum: 27,
    month: 9,
    year: 2026,
    title: "Purnama Sasih Katiga",
    shortTitle: "Purnama Katiga",
    category: "purnama-tilem",
    wukuOrSasih: "Sasih Katiga (Bulan Ke-3)",
    description: "Hari suci purnama sasih ketiga.",
    rituals: ["Persembahyangan Purnama"],
  },
  {
    id: "2026-10-11",
    dateStr: "Minggu, 11 Oktober 2026",
    dayName: "Minggu",
    dateNum: 11,
    month: 10,
    year: 2026,
    title: "Tilem Sasih Katiga",
    shortTitle: "Tilem Katiga",
    category: "purnama-tilem",
    wukuOrSasih: "Sasih Katiga",
    description: "Hari tilem sasih ketiga.",
    rituals: ["Persembahyangan Tilem"],
  },
  {
    id: "2026-10-26",
    dateStr: "Senin, 26 Oktober 2026",
    dayName: "Senin",
    dateNum: 26,
    month: 10,
    year: 2026,
    title: "Purnama Sasih Kapat",
    shortTitle: "Purnama Kapat",
    category: "purnama-tilem",
    wukuOrSasih: "Sasih Kapat",
    description: "Purnama Kapat yang agung bertepatan dengan keindahan alam semesta.",
    rituals: ["Persembahyangan Purnama Kapat"],
  },
  {
    id: "2026-10-31",
    dateStr: "Sabtu, 31 Oktober 2026",
    dayName: "Sabtu",
    dateNum: 31,
    month: 10,
    year: 2026,
    title: "HARI RAYA SARASWATI (PERIODE II)",
    shortTitle: "Hari Saraswati II",
    category: "utama",
    wukuOrSasih: "Saniscara Umanis Watugunung (Siklus Pawukon Ke-2)",
    description: "Perayaan kedua Hari Saraswati di tahun 2026 (siklus 210 hari). Momen sakral persembahyangan bersama mahasiswa menjelang Ujian Akhir Semester.",
    rituals: ["Persembahyangan Bersama UKMKHD", "Penyucian Buku & Sarana Kuliah", "Kajian Dharma"],
  },
  {
    id: "2026-11-01",
    dateStr: "Minggu, 1 November 2026",
    dayName: "Minggu",
    dateNum: 1,
    month: 11,
    year: 2026,
    title: "Banyu Pinaruh (Periode II)",
    shortTitle: "Banyu Pinaruh",
    category: "utama",
    wukuOrSasih: "Redite Paing Sinta",
    description: "Penyucian diri pasca Saraswati ke-2.",
    rituals: ["Mandi Suci", "Penyucian Pikiran"],
  },
  {
    id: "2026-11-04",
    dateStr: "Rabu, 4 November 2026",
    dayName: "Rabu",
    dateNum: 4,
    month: 11,
    year: 2026,
    title: "Hari Raya Pagerwesi (Periode II)",
    shortTitle: "Pagerwesi II",
    category: "utama",
    wukuOrSasih: "Buda Kliwon Sinta",
    description: "Hari pemagaran jiwa kedua di tahun 2026 kepada Sang Hyang Pramesti Guru.",
    rituals: ["Pemujaan Sang Hyang Pramesti Guru"],
  },
  {
    id: "2026-11-10",
    dateStr: "Selasa, 10 November 2026",
    dayName: "Selasa",
    dateNum: 10,
    month: 11,
    year: 2026,
    title: "Tilem Sasih Kapat",
    shortTitle: "Tilem Kapat",
    category: "purnama-tilem",
    wukuOrSasih: "Sasih Kapat",
    description: "Hari tilem ke-4.",
    rituals: ["Persembahyangan Tilem"],
  },
  {
    id: "2026-11-25",
    dateStr: "Rabu, 25 November 2026",
    dayName: "Rabu",
    dateNum: 25,
    month: 11,
    year: 2026,
    title: "Purnama Sasih Kalima",
    shortTitle: "Purnama Kalima",
    category: "purnama-tilem",
    wukuOrSasih: "Sasih Kalima",
    description: "Hari suci purnama bulan kelima.",
    rituals: ["Persembahyangan Purnama"],
  },
  {
    id: "2026-12-09",
    dateStr: "Rabu, 9 Desember 2026",
    dayName: "Rabu",
    dateNum: 9,
    month: 12,
    year: 2026,
    title: "Tilem Sasih Kalima",
    shortTitle: "Tilem Kalima",
    category: "purnama-tilem",
    wukuOrSasih: "Sasih Kalima",
    description: "Hari suci tilem bulan kelima.",
    rituals: ["Persembahyangan Tilem"],
  },
  {
    id: "2026-12-24",
    dateStr: "Kamis, 24 Desember 2026",
    dayName: "Kamis",
    dateNum: 24,
    month: 12,
    year: 2026,
    title: "Purnama Sasih Kanem",
    shortTitle: "Purnama Kanem",
    category: "purnama-tilem",
    wukuOrSasih: "Sasih Kanem",
    description: "Purnama ke-6 bertepatan dengan suasana penutup tahun masehi.",
    rituals: ["Persembahyangan Purnama"],
  },
  {
    id: "2026-12-26",
    dateStr: "Sabtu, 26 Desember 2026",
    dayName: "Sabtu",
    dateNum: 26,
    month: 12,
    year: 2026,
    title: "Tumpek Landep (Periode II)",
    shortTitle: "Tumpek Landep II",
    category: "pawukon",
    wukuOrSasih: "Saniscara Kliwon Landep (Siklus Pawukon Baru)",
    description: "Pemujaan Sang Hyang Pasupati kedua di tahun 2026.",
    rituals: ["Pemujaan Sang Hyang Pasupati", "Refleksi Akhir Tahun"],
  },
];

// Curated authentic database for 2027 (verified by Kalender Bali SKB)
const BASE_EVENTS_2027: HolyDayEvent[] = [
  {
    id: "2027-01-06",
    dateStr: "Rabu, 6 Januari 2027",
    dayName: "Rabu",
    dateNum: 6,
    month: 1,
    year: 2027,
    title: "Hari Suci Siwaratri 2027",
    shortTitle: "Hari Siwaratri",
    category: "utama",
    wukuOrSasih: "Buda Umanis Medangsia (Purwaning Tilem Sasih Kapitu)",
    description: "Malam perenungan dosa dan kebangkitan kesadaran jiwa (Jagra).",
    rituals: ["Mona Brata (Hening)", "Upawasa (Puasa)", "Jagra Semalam Suntuk"],
  },
  {
    id: "2027-01-12",
    dateStr: "Selasa, 12 Januari 2027",
    dayName: "Selasa",
    dateNum: 12,
    month: 1,
    year: 2027,
    title: "Penampahan Galungan (Periode I)",
    shortTitle: "Penampahan Galungan",
    category: "utama",
    wukuOrSasih: "Anggara Wage Dungulan",
    description: "Persiapan Galungan pertama tahun 2027 dan pendirian penjor suci.",
    rituals: ["Pemasangan Penjor", "Penyucian Diri"],
  },
  {
    id: "2027-01-13",
    dateStr: "Rabu, 13 Januari 2027",
    dayName: "Rabu",
    dateNum: 13,
    month: 1,
    year: 2027,
    title: "HARI RAYA GALUNGAN (PERIODE I)",
    shortTitle: "Galungan I 2027",
    category: "utama",
    wukuOrSasih: "Buda Kliwon Dungulan",
    description: "Kemenangan Dharma atas Adharma periode pertama tahun 2027.",
    rituals: ["Persembahyangan Agung di Pura", "Pemberkatan Leluhur"],
  },
  {
    id: "2027-01-14",
    dateStr: "Kamis, 14 Januari 2027",
    dayName: "Kamis",
    dateNum: 14,
    month: 1,
    year: 2027,
    title: "Umanis Galungan (Periode I)",
    shortTitle: "Umanis Galungan",
    category: "utama",
    wukuOrSasih: "Wraspati Umanis Dungulan",
    description: "Hari silaturahmi dan dharma santi kekeluargaan.",
    rituals: ["Dharma Santi"],
  },
  {
    id: "2027-01-22",
    dateStr: "Jumat, 22 Januari 2027",
    dayName: "Jumat",
    dateNum: 22,
    month: 1,
    year: 2027,
    title: "Penampahan Kuningan (Periode I)",
    shortTitle: "Penampahan Kuningan",
    category: "utama",
    wukuOrSasih: "Sukra Wage Kuningan",
    description: "Persiapan sarana persembahyangan Kuningan pertama 2027.",
    rituals: ["Pemasangan Tamiang"],
  },
  {
    id: "2027-01-23",
    dateStr: "Sabtu, 23 Januari 2027",
    dayName: "Sabtu",
    dateNum: 23,
    month: 1,
    year: 2027,
    title: "HARI RAYA KUNINGAN (PERIODE I)",
    shortTitle: "Kuningan I 2027",
    category: "utama",
    wukuOrSasih: "Saniscara Kliwon Kuningan",
    description: "Permohonan anugerah kesucian dan kemakmuran kepada Sang Hyang Widhi.",
    rituals: ["Sembahyang Pagi", "Persembahan Nasi Kuning"],
  },
  {
    id: "2027-03-07",
    dateStr: "Minggu, 7 Maret 2027",
    dayName: "Minggu",
    dateNum: 7,
    month: 3,
    year: 2027,
    title: "Tawur Kesanga & Pawai Ogoh-Ogoh 2027",
    shortTitle: "Tawur Kesanga",
    category: "utama",
    wukuOrSasih: "Tilem Sasih Kesanga (Purwaning Nyepi Saka 1949)",
    description: "Upacara bhuta yadnya skala agung menjelang Nyepi Saka 1949.",
    rituals: ["Tawur Agung", "Pawai Ogoh-Ogoh"],
    isNationalHoliday: true,
  },
  {
    id: "2027-03-08",
    dateStr: "Senin, 8 Maret 2027",
    dayName: "Senin",
    dateNum: 8,
    month: 3,
    year: 2027,
    title: "HARI RAYA NYEPI (TAHUN BARU SAKA 1949)",
    shortTitle: "Nyepi Saka 1949",
    category: "utama",
    wukuOrSasih: "Pananggal Apisan Sasih Kedasa (Tahun Baru Saka 1949)",
    description: "Puncak keheningan Tahun Baru Saka 1949. Pelaksanaan Catur Brata Penyepian selama 24 jam penuh.",
    rituals: ["Catur Brata Penyepian (24 Jam)", "Mulat Sarira Total", "Samadhi Hening"],
    isNationalHoliday: true,
  },
  {
    id: "2027-03-09",
    dateStr: "Selasa, 9 Maret 2027",
    dayName: "Selasa",
    dateNum: 9,
    month: 3,
    year: 2027,
    title: "Ngembak Geni & Dharma Santi 2027",
    shortTitle: "Ngembak Geni",
    category: "utama",
    wukuOrSasih: "Pananggal Ping Kalih Sasih Kedasa",
    description: "Berakhirnya masa brata penyepian dan saling bermaaf-maafan.",
    rituals: ["Dharma Santi", "Saling Memaafkan"],
    isNationalHoliday: true,
  },
  {
    id: "2027-05-29",
    dateStr: "Sabtu, 29 Mei 2027",
    dayName: "Sabtu",
    dateNum: 29,
    month: 5,
    year: 2027,
    title: "HARI RAYA SARASWATI (PERIODE I 2027)",
    shortTitle: "Saraswati 2027",
    category: "utama",
    wukuOrSasih: "Saniscara Umanis Watugunung",
    description: "Hari suci turunnya ilmu pengetahuan suci bagi civitas akademika di tahun 2027.",
    rituals: ["Pemujaan Dewi Saraswati", "Penyucian Pustaka Suci"],
  },
  {
    id: "2027-05-30",
    dateStr: "Minggu, 30 Mei 2027",
    dayName: "Minggu",
    dateNum: 30,
    month: 5,
    year: 2027,
    title: "Banyu Pinaruh 2027",
    shortTitle: "Banyu Pinaruh",
    category: "utama",
    wukuOrSasih: "Redite Paing Sinta",
    description: "Penyucian diri di sumber air suci pasca Saraswati.",
    rituals: ["Mandi Suci Pagi"],
  },
  {
    id: "2027-06-02",
    dateStr: "Rabu, 2 Juni 2027",
    dayName: "Rabu",
    dateNum: 2,
    month: 6,
    year: 2027,
    title: "Hari Raya Pagerwesi 2027",
    shortTitle: "Pagerwesi 2027",
    category: "utama",
    wukuOrSasih: "Buda Kliwon Sinta",
    description: "Pengokohan benteng rohani kepada Sang Hyang Pramesti Guru.",
    rituals: ["Pemujaan Sang Hyang Pramesti Guru"],
  },
  {
    id: "2027-08-10",
    dateStr: "Selasa, 10 Agustus 2027",
    dayName: "Selasa",
    dateNum: 10,
    month: 8,
    year: 2027,
    title: "Penampahan Galungan (Periode II)",
    shortTitle: "Penampahan Galungan II",
    category: "utama",
    wukuOrSasih: "Anggara Wage Dungulan",
    description: "Persiapan Galungan kedua tahun 2027 dan pemasangan penjor.",
    rituals: ["Pemasangan Penjor"],
  },
  {
    id: "2027-08-11",
    dateStr: "Rabu, 11 Agustus 2027",
    dayName: "Rabu",
    dateNum: 11,
    month: 8,
    year: 2027,
    title: "HARI RAYA GALUNGAN (PERIODE II)",
    shortTitle: "Galungan II 2027",
    category: "utama",
    wukuOrSasih: "Buda Kliwon Dungulan",
    description: "Perayaan kedua kemenangan Dharma melawan Adharma di tahun 2027.",
    rituals: ["Persembahyangan Agung di Pura", "Dharma Santi"],
  },
  {
    id: "2027-08-12",
    dateStr: "Kamis, 12 Agustus 2027",
    dayName: "Kamis",
    dateNum: 12,
    month: 8,
    year: 2027,
    title: "Umanis Galungan (Periode II)",
    shortTitle: "Umanis Galungan II",
    category: "utama",
    wukuOrSasih: "Wraspati Umanis Dungulan",
    description: "Silaturahmi dan temu kekeluargaan umat Hindu.",
    rituals: ["Dharma Santi"],
  },
  {
    id: "2027-08-20",
    dateStr: "Jumat, 20 Agustus 2027",
    dayName: "Jumat",
    dateNum: 20,
    month: 8,
    year: 2027,
    title: "Penampahan Kuningan (Periode II)",
    shortTitle: "Penampahan Kuningan II",
    category: "utama",
    wukuOrSasih: "Sukra Wage Kuningan",
    description: "Persiapan Kuningan kedua tahun 2027.",
    rituals: ["Pemasangan Tamiang"],
  },
  {
    id: "2027-08-21",
    dateStr: "Sabtu, 21 Agustus 2027",
    dayName: "Sabtu",
    dateNum: 21,
    month: 8,
    year: 2027,
    title: "HARI RAYA KUNINGAN (PERIODE II)",
    shortTitle: "Kuningan II 2027",
    category: "utama",
    wukuOrSasih: "Saniscara Kliwon Kuningan",
    description: "Perayaan Kuningan kedua tahun 2027 sebelum pukul 12.00 siang.",
    rituals: ["Persembahyangan Pagi", "Nasi Kuning"],
  },
  {
    id: "2027-12-25",
    dateStr: "Sabtu, 25 Desember 2027",
    dayName: "Sabtu",
    dateNum: 25,
    month: 12,
    year: 2027,
    title: "HARI RAYA SARASWATI (PERIODE II 2027)",
    shortTitle: "Saraswati II 2027",
    category: "utama",
    wukuOrSasih: "Saniscara Umanis Watugunung",
    description: "Perayaan Saraswati penutup tahun 2027 bertepatan dengan libur semester.",
    rituals: ["Pemujaan Dewi Saraswati"],
  },
];

// Generates dynamic holy days for any year (2025, 2026, 2027, 2028, etc.)
function getHolyDaysForYear(targetYear: number): HolyDayEvent[] {
  if (targetYear === 2026) return BASE_EVENTS_2026;
  if (targetYear === 2027) return BASE_EVENTS_2027;

  // Algorithmic projection for any other year based on 210-day Pawukon cycle
  const events: HolyDayEvent[] = [];
  const dayNames = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const anchorSaraswati = new Date("2026-04-04T00:00:00Z").getTime();
  const anchorGalungan = new Date("2026-06-17T00:00:00Z").getTime();
  const DAY_MS = 86400000;
  const PAWUKON_MS = 210 * DAY_MS;

  // Project Saraswati cycles into targetYear
  const yearStart = new Date(Date.UTC(targetYear, 0, 1)).getTime();
  const yearEnd = new Date(Date.UTC(targetYear, 11, 31)).getTime();

  // Find nearest Pawukon cycle
  const cycleDiff = Math.floor((yearStart - anchorSaraswati) / PAWUKON_MS) - 2;
  for (let c = cycleDiff; c <= cycleDiff + 6; c++) {
    const sTime = anchorSaraswati + c * PAWUKON_MS;
    const sDate = new Date(sTime);
    if (sDate.getUTCFullYear() === targetYear) {
      const m = sDate.getUTCMonth() + 1;
      const d = sDate.getUTCDate();
      events.push({
        id: `${targetYear}-${m}-${d}-saraswati`,
        dateStr: `Sabtu, ${d} ${MONTH_NAMES[m - 1]} ${targetYear}`,
        dayName: "Sabtu",
        dateNum: d,
        month: m,
        year: targetYear,
        title: `HARI RAYA SARASWATI ${targetYear}`,
        shortTitle: "Hari Saraswati",
        category: "utama",
        wukuOrSasih: "Saniscara Umanis Watugunung",
        description: "Hari suci turunnya ilmu pengetahuan suci bagi civitas akademika.",
        rituals: ["Pemujaan Dewi Saraswati", "Pustaka Suci"],
      });
    }

    const gTime = anchorGalungan + c * PAWUKON_MS;
    const gDate = new Date(gTime);
    if (gDate.getUTCFullYear() === targetYear) {
      const m = gDate.getUTCMonth() + 1;
      const d = gDate.getUTCDate();
      events.push({
        id: `${targetYear}-${m}-${d}-galungan`,
        dateStr: `Rabu, ${d} ${MONTH_NAMES[m - 1]} ${targetYear}`,
        dayName: "Rabu",
        dateNum: d,
        month: m,
        year: targetYear,
        title: `HARI RAYA GALUNGAN ${targetYear}`,
        shortTitle: "Hari Galungan",
        category: "utama",
        wukuOrSasih: "Buda Kliwon Dungulan",
        description: "Hari kemenangan Dharma melawan Adharma.",
        rituals: ["Persembahyangan Agung di Pura", "Penjor Galungan"],
      });

      // Kuningan 10 days later
      const kDate = new Date(gTime + 10 * DAY_MS);
      if (kDate.getUTCFullYear() === targetYear) {
        const km = kDate.getUTCMonth() + 1;
        const kd = kDate.getUTCDate();
        events.push({
          id: `${targetYear}-${km}-${kd}-kuningan`,
          dateStr: `Sabtu, ${kd} ${MONTH_NAMES[km - 1]} ${targetYear}`,
          dayName: "Sabtu",
          dateNum: kd,
          month: km,
          year: targetYear,
          title: `HARI RAYA KUNINGAN ${targetYear}`,
          shortTitle: "Hari Kuningan",
          category: "utama",
          wukuOrSasih: "Saniscara Kliwon Kuningan",
          description: "Hari permohonan anugerah kesucian dan kemakmuran.",
          rituals: ["Persembahyangan Pagi", "Nasi Kuning"],
        });
      }
    }
  }

  // Nyepi estimation
  const nyepiDates: Record<number, { d: number; m: number; saka: number }> = {
    2025: { d: 29, m: 3, saka: 1947 },
    2026: { d: 19, m: 3, saka: 1948 },
    2027: { d: 8, m: 3, saka: 1949 },
    2028: { d: 26, m: 3, saka: 1950 },
    2029: { d: 15, m: 3, saka: 1951 },
    2030: { d: 5, m: 3, saka: 1952 },
  };

  const nyepiInfo = nyepiDates[targetYear] || { d: 21, m: 3, saka: targetYear - 78 };
  events.push({
    id: `${targetYear}-${nyepiInfo.m}-${nyepiInfo.d}-nyepi`,
    dateStr: `${nyepiInfo.d} ${MONTH_NAMES[nyepiInfo.m - 1]} ${targetYear}`,
    dayName: "Hari Suci",
    dateNum: nyepiInfo.d,
    month: nyepiInfo.m,
    year: targetYear,
    title: `HARI RAYA NYEPI (TAHUN BARU SAKA ${nyepiInfo.saka})`,
    shortTitle: `Nyepi Saka ${nyepiInfo.saka}`,
    category: "utama",
    wukuOrSasih: `Tahun Baru Saka ${nyepiInfo.saka}`,
    description: `Puncak keheningan Tahun Baru Saka ${nyepiInfo.saka} dengan pelaksanaan Catur Brata Penyepian.`,
    rituals: ["Catur Brata Penyepian", "Mulat Sarira"],
    isNationalHoliday: true,
  });

  return events.sort((a, b) => a.month - b.month || a.dateNum - b.dateNum);
}

const MONTH_NAMES = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember"
];

const BALINESE_DAY_NAMES = [
  { id: "Min", bali: "Redite", full: "Minggu", isRed: true },
  { id: "Sen", bali: "Soma", full: "Senin", isRed: false },
  { id: "Sel", bali: "Anggara", full: "Selasa", isRed: false },
  { id: "Rab", bali: "Buda", full: "Rabu", isRed: false },
  { id: "Kam", bali: "Wraspati", full: "Kamis", isRed: false },
  { id: "Jum", bali: "Sukra", full: "Jumat", isRed: false },
  { id: "Sab", bali: "Saniscara", full: "Sabtu", isRed: true },
];

export default function KalenderContent() {
  // Current active year and month
  const [currentYear, setCurrentYear] = useState<number>(2026);
  const [currentMonth, setCurrentMonth] = useState<number>(3); // 1-12
  
  // Real client browser today date
  const [todayDate, setTodayDate] = useState<{ day: number; month: number; year: number } | null>(null);

  // Search query
  const [searchQuery, setSearchQuery] = useState<string>("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Selected Day event for side inspector
  const [selectedEvent, setSelectedEvent] = useState<HolyDayEvent | null>(null);

  // Selected specific calendar date { day, month, year }
  const [selectedDate, setSelectedDate] = useState<{ day: number; month: number; year: number } | null>(null);

  // Category filter state ("ALL", "utama", "purnama-tilem", "pawukon")
  const [selectedCategory, setSelectedCategory] = useState<"ALL" | "utama" | "purnama-tilem" | "pawukon">("ALL");
  const [isCatDropdownOpen, setIsCatDropdownOpen] = useState<boolean>(false);

  // DOM Refs for mobile auto-scrolling & gesture handling
  const monthTabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const inspectorRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  // Auto-detect client current user date on mount
  useEffect(() => {
    const today = new Date();
    const y = today.getFullYear();
    const m = today.getMonth() + 1; // 1-12
    const d = today.getDate();

    setCurrentYear(y);
    setCurrentMonth(m);
    setTodayDate({ day: d, month: m, year: y });
    setSelectedDate({ day: d, month: m, year: y });

    // Check if today has a holy event
    const yearEvents = getHolyDaysForYear(y);
    const todayEv = yearEvents.find((e) => e.month === m && e.dateNum === d) || null;
    setSelectedEvent(todayEv);
  }, []);

  // Smoothly center active month tab into mobile viewport
  useEffect(() => {
    monthTabRefs.current[currentMonth - 1]?.scrollIntoView({
      inline: "center",
      behavior: "smooth",
      block: "nearest",
    });
  }, [currentMonth]);

  // Touch swipe handlers for month switching
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;
    if (Math.abs(deltaX) > 60 && Math.abs(deltaX) > Math.abs(deltaY) * 1.5) {
      if (deltaX < 0) {
        handleNextMonth();
      } else {
        handlePrevMonth();
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  const handleSelectEvent = (ev: HolyDayEvent) => {
    setSelectedEvent(ev);
    setSelectedDate({ day: ev.dateNum, month: ev.month, year: ev.year });
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      setTimeout(() => {
        inspectorRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }, 50);
    }
  };

  // Events for current active year
  const activeYearEvents = useMemo(() => {
    return getHolyDaysForYear(currentYear);
  }, [currentYear]);

  // Month navigation (handles rolling into 2027 and forward)
  const handlePrevMonth = () => {
    let nextM = currentMonth - 1;
    let nextY = currentYear;
    if (currentMonth === 1) {
      nextM = 12;
      nextY = currentYear - 1;
      setCurrentYear(nextY);
    }
    setCurrentMonth(nextM);
    const yrEvents = getHolyDaysForYear(nextY);
    const firstEv = yrEvents.find((e) => e.month === nextM);
    if (firstEv) {
      setSelectedEvent(firstEv);
      setSelectedDate({ day: firstEv.dateNum, month: firstEv.month, year: firstEv.year });
    } else {
      setSelectedEvent(null);
      setSelectedDate(null);
    }
  };

  const handleNextMonth = () => {
    let nextM = currentMonth + 1;
    let nextY = currentYear;
    if (currentMonth === 12) {
      nextM = 1;
      nextY = currentYear + 1;
      setCurrentYear(nextY);
    }
    setCurrentMonth(nextM);
    const yrEvents = getHolyDaysForYear(nextY);
    const firstEv = yrEvents.find((e) => e.month === nextM);
    if (firstEv) {
      setSelectedEvent(firstEv);
      setSelectedDate({ day: firstEv.dateNum, month: firstEv.month, year: firstEv.year });
    } else {
      setSelectedEvent(null);
      setSelectedDate(null);
    }
  };

  // Jump to today's date
  const handleJumpToToday = () => {
    const today = new Date();
    const y = today.getFullYear();
    const m = today.getMonth() + 1;
    const d = today.getDate();
    setCurrentYear(y);
    setCurrentMonth(m);
    setSelectedDate({ day: d, month: m, year: y });
    
    const yearEvents = getHolyDaysForYear(y);
    const todayEv = yearEvents.find((e) => e.month === m && e.dateNum === d) || null;
    setSelectedEvent(todayEv);
  };

  // Build calendar grid array for currentMonth & currentYear
  const calendarDays = useMemo(() => {
    const firstDayIndex = new Date(currentYear, currentMonth - 1, 1).getDay(); // 0 = Sun
    const totalDaysInCurrentMonth = new Date(currentYear, currentMonth, 0).getDate();
    const totalDaysInPrevMonth = new Date(currentYear, currentMonth - 1, 0).getDate();

    const days = [];

    // 1. Previous month trailing days
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      days.push({
        dateNum: totalDaysInPrevMonth - i,
        month: currentMonth === 1 ? 12 : currentMonth - 1,
        year: currentMonth === 1 ? currentYear - 1 : currentYear,
        isCurrentMonth: false,
      });
    }

    // 2. Current month active days
    for (let d = 1; d <= totalDaysInCurrentMonth; d++) {
      days.push({
        dateNum: d,
        month: currentMonth,
        year: currentYear,
        isCurrentMonth: true,
      });
    }

    // 3. Next month leading days to complete the 35 or 42 grid cells
    const remainingCells = (7 - (days.length % 7)) % 7;
    for (let j = 1; j <= remainingCells; j++) {
      days.push({
        dateNum: j,
        month: currentMonth === 12 ? 1 : currentMonth + 1,
        year: currentMonth === 12 ? currentYear + 1 : currentYear,
        isCurrentMonth: false,
      });
    }

    return days;
  }, [currentMonth, currentYear]);

  // Holy days in current viewed month
  const currentMonthEvents = useMemo(() => {
    return activeYearEvents
      .filter((e) => e.month === currentMonth)
      .sort((a, b) => a.dateNum - b.dateNum);
  }, [activeYearEvents, currentMonth]);

  const currentEventIndex = currentMonthEvents.findIndex((e) => e.id === selectedEvent?.id);
  const prevMonthEvent = currentEventIndex > 0 ? currentMonthEvents[currentEventIndex - 1] : null;
  const nextMonthEvent =
    currentEventIndex >= 0 && currentEventIndex < currentMonthEvents.length - 1
      ? currentMonthEvents[currentEventIndex + 1]
      : null;

  // Search matches strictly within the current year selected by the user
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return activeYearEvents
      .filter((e) => e.year === currentYear)
      .filter(
        (e) =>
          e.title.toLowerCase().includes(q) ||
          e.description.toLowerCase().includes(q) ||
          e.wukuOrSasih.toLowerCase().includes(q) ||
          e.dateStr.toLowerCase().includes(q)
      );
  }, [activeYearEvents, currentYear, searchQuery]);

  return (
    <div className="relative isolate min-h-screen pt-20 sm:pt-24 pb-20 overflow-hidden bg-[#02121e] text-white">
      {/* Dynamic Animated Canvas Background */}
      <AnimatedBackground />

      <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ==============================================================
            INTERACTIVE CONTROLS BAR: MONTH PAGER, YEAR SWITCHER & SMALL SEARCH BAR
            ============================================================== */}
        <div className="space-y-3 mb-6 sm:mb-8">
          
          {/* ==========================================================
              DESKTOP CONTROLS BAR (md:flex)
              ========================================================== */}
          <div className="hidden md:flex items-center justify-between gap-3">
            {/* Month Selector Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-auto p-1.5 rounded-full bg-white/[0.04] backdrop-blur-xl border border-white/15 scrollbar-none snap-x">
              {MONTH_NAMES.map((name, idx) => {
                const mNum = idx + 1;
                const isActive = currentMonth === mNum;
                return (
                  <button
                    key={name}
                    ref={(el) => {
                      monthTabRefs.current[idx] = el;
                    }}
                    onClick={() => {
                      setCurrentMonth(mNum);
                      const firstEv = activeYearEvents.find((e) => e.month === mNum);
                      if (firstEv) {
                        setSelectedEvent(firstEv);
                        setSelectedDate({ day: firstEv.dateNum, month: firstEv.month, year: firstEv.year });
                      } else {
                        setSelectedEvent(null);
                        setSelectedDate(null);
                      }
                    }}
                    className={`px-3 py-1.5 rounded-full font-subheading text-xs font-semibold shrink-0 snap-start active:scale-95 transition-all ${
                      isActive
                        ? "bg-white/20 text-white border border-white/30 shadow-md scale-105"
                        : "text-white/70 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {name.substring(0, 3)}
                  </button>
                );
              })}
            </div>

            {/* Right: "Hari Ini" Snap Button & Small Search Bar */}
            <div className="flex items-center gap-2.5 justify-end">
              <button
                onClick={handleJumpToToday}
                className="px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-subheading font-bold text-white hover:bg-white/20 active:scale-95 transition-all shrink-0"
                title="Kembali ke Hari Ini"
              >
                Hari Ini
              </button>

              <div className="relative w-44 sm:w-56">
                <Search className="w-3.5 h-3.5 text-white/50 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder={`Cari hari raya ${currentYear}...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-7 py-1.5 rounded-full bg-white/[0.06] backdrop-blur-md border border-white/15 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#8bd4ff] transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}

                {/* Search Results Dropdown */}
                {searchQuery.trim() !== "" && (
                  <div className="absolute top-full mt-2 right-0 w-72 sm:w-80 max-h-64 overflow-y-auto rounded-2xl bg-[#021827]/95 backdrop-blur-2xl border border-white/20 shadow-2xl z-50 p-2 space-y-1.5">
                    <span className="text-[10px] font-subheading font-bold uppercase tracking-wider text-white/50 block px-2 py-1">
                      Hasil Pencarian Tahun {currentYear} ({searchResults.length}):
                    </span>
                    {searchResults.length === 0 ? (
                      <span className="text-xs text-white/60 italic block px-2 py-2">
                        Tidak ditemukan hari raya di tahun {currentYear}.
                      </span>
                    ) : (
                      searchResults.map((ev) => (
                        <button
                          key={ev.id}
                          onClick={() => {
                            setCurrentMonth(ev.month);
                            handleSelectEvent(ev);
                            setSearchQuery("");
                          }}
                          className="w-full text-left p-2 rounded-xl hover:bg-white/10 transition-colors flex items-center justify-between text-xs"
                        >
                          <div>
                            <span className="font-heading font-bold text-white block">
                              {ev.title}
                            </span>
                            <span className="font-subheading text-[10px] text-white/60 block">
                              {ev.dateStr}
                            </span>
                          </div>
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/10 text-[#8bd4ff]">
                            Lihat
                          </span>
                        </button>
                      ))
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Desktop Category Filter Pills */}
          <div className="hidden md:flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none snap-x">
            {[
              { id: "ALL", label: "Semua Kategori", dot: null },
              { id: "utama", label: "Hari Raya Utama", dot: "bg-[#ff3b4e]" },
              { id: "purnama-tilem", label: "Purnama & Tilem", dot: "bg-[#ffd166]" },
              { id: "pawukon", label: "Pawukon", dot: "bg-[#38bdf8]" },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as any)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-subheading font-medium whitespace-nowrap snap-start active:scale-95 transition-all ${
                  selectedCategory === cat.id
                    ? "bg-white/20 text-white border border-white/30 shadow-sm"
                    : "bg-white/[0.04] text-white/60 hover:text-white border border-white/5"
                }`}
              >
                {cat.dot && <span className={`w-2 h-2 rounded-full ${cat.dot} shrink-0`} />}
                <span>{cat.label}</span>
              </button>
            ))}
          </div>

          {/* ==========================================================
              MOBILE CONTROLS BAR (< md): 1 UNIFIED HORIZONTAL ROW
              Month slider removed, category selector made into a dropdown
              so "Kategori", "Hari Ini", and "Cari" fit in 1 horizontal line
              ========================================================== */}
          <div className="flex md:hidden items-center gap-2 w-full">
            
            {/* Custom Liquid Glass Category Dropdown */}
            <div className="relative shrink-0">
              <button
                type="button"
                onClick={() => setIsCatDropdownOpen(!isCatDropdownOpen)}
                className="flex items-center gap-1.5 pl-3 pr-2.5 py-2 rounded-full bg-white/[0.08] backdrop-blur-md border border-white/20 text-xs font-subheading font-semibold text-white hover:bg-white/15 active:scale-95 transition-all shadow-md"
              >
                {selectedCategory === "utama" && <span className="w-2 h-2 rounded-full bg-[#ff3b4e] shrink-0" />}
                {selectedCategory === "purnama-tilem" && <span className="w-2 h-2 rounded-full bg-[#ffd166] shrink-0" />}
                {selectedCategory === "pawukon" && <span className="w-2 h-2 rounded-full bg-[#38bdf8] shrink-0" />}
                <span className="truncate max-w-[95px]">
                  {selectedCategory === "ALL"
                    ? "Kategori"
                    : selectedCategory === "utama"
                    ? "Utama"
                    : selectedCategory === "purnama-tilem"
                    ? "Purnama/Tilem"
                    : "Pawukon"}
                </span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-white/60 transition-transform duration-200 ${
                    isCatDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isCatDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsCatDropdownOpen(false)}
                  />
                  <div className="absolute top-full left-0 mt-2 w-48 rounded-2xl bg-[#021827] border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.9)] z-50 p-1.5 space-y-1 animate-in fade-in zoom-in-95 duration-150">
                    {[
                      { id: "ALL", label: "Semua Kategori", dot: null },
                      { id: "utama", label: "Hari Raya Utama", dot: "bg-[#ff3b4e]" },
                      { id: "purnama-tilem", label: "Purnama & Tilem", dot: "bg-[#ffd166]" },
                      { id: "pawukon", label: "Pawukon / Tumpek", dot: "bg-[#38bdf8]" },
                    ].map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => {
                          setSelectedCategory(cat.id as any);
                          setIsCatDropdownOpen(false);
                        }}
                        className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-subheading font-medium text-left transition-colors ${
                          selectedCategory === cat.id
                            ? "bg-white/20 text-white font-bold"
                            : "text-white/75 hover:text-white hover:bg-white/10"
                        }`}
                      >
                        {cat.dot ? (
                          <span className={`w-2 h-2 rounded-full ${cat.dot} shrink-0`} />
                        ) : (
                          <span className="w-2 h-2 rounded-full bg-white/30 shrink-0" />
                        )}
                        <span>{cat.label}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* "Hari Ini" Snap Button */}
            <button
              onClick={handleJumpToToday}
              className="px-3 py-2 rounded-full bg-white/10 border border-white/20 text-xs font-subheading font-bold text-white hover:bg-white/20 active:scale-95 transition-all shrink-0 whitespace-nowrap"
              title="Kembali ke Hari Ini"
            >
              Hari Ini
            </button>

            {/* Compact Search Bar with Flexible Width */}
            <div className="relative flex-1 min-w-0">
              <Search className="w-3.5 h-3.5 text-white/50 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Cari..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-7 py-2 rounded-full bg-white/[0.06] backdrop-blur-md border border-white/15 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#8bd4ff] transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
                >
                  <X className="w-3 h-3" />
                </button>
              )}

              {/* Mobile Search Results Dropdown */}
              {searchQuery.trim() !== "" && (
                <div className="absolute top-full mt-2 right-0 left-0 max-h-64 overflow-y-auto rounded-2xl bg-[#021827]/98 backdrop-blur-2xl border border-white/20 shadow-2xl z-50 p-2 space-y-1.5">
                  <span className="text-[10px] font-subheading font-bold uppercase tracking-wider text-white/50 block px-2 py-1">
                    Hasil Pencarian ({searchResults.length}):
                  </span>
                  {searchResults.length === 0 ? (
                    <span className="text-xs text-white/60 italic block px-2 py-2">
                      Tidak ditemukan hari raya di tahun {currentYear}.
                    </span>
                  ) : (
                    searchResults.map((ev) => (
                      <button
                        key={ev.id}
                        onClick={() => {
                          setCurrentMonth(ev.month);
                          handleSelectEvent(ev);
                          setSearchQuery("");
                        }}
                        className="w-full text-left p-2 rounded-xl hover:bg-white/10 transition-colors flex items-center justify-between text-xs"
                      >
                        <div>
                          <span className="font-heading font-bold text-white block">
                            {ev.title}
                          </span>
                          <span className="font-subheading text-[10px] text-white/60 block">
                            {ev.dateStr}
                          </span>
                        </div>
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/10 text-[#8bd4ff]">
                          Lihat
                        </span>
                      </button>
                    ))
                  )}
                </div>
              )}
            </div>

          </div>

        </div>

        {/* ==============================================================
            MAIN CALENDAR APPLICATION LAYOUT (7-Column Grid + Inspector)
            ============================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:items-stretch items-start">
          
          {/* ==========================================================
              LEFT/MAIN: THE ACTUAL 7-COLUMN CALENDAR
              ========================================================== */}
          <div className="lg:col-span-8 flex flex-col h-full">
            
            <LiquidGlassCard 
              className="p-3.5 sm:p-6 w-full shadow-2xl h-full"
              contentClassName="h-full flex flex-col justify-between"
            >
              <div
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                className="h-full flex flex-col justify-between"
              >
                {/* Calendar Month Header with Prev/Next Controls */}
                <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-[#8bd4ff]">
                      <CalendarIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="font-heading text-xl sm:text-3xl font-extrabold text-white tracking-tight leading-none">
                        {MONTH_NAMES[currentMonth - 1]} {currentYear}
                      </h2>
                      <span className="hidden md:block font-subheading text-[11px] sm:text-xs text-[#8bd4ff] font-medium mt-1">
                        Penanggalan Hindu Dharma · {currentYear}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handlePrevMonth}
                      className="p-2 rounded-xl bg-white/5 border border-white/15 text-white/80 hover:text-white hover:bg-white/15 active:scale-95 transition-all"
                      title="Bulan Sebelumnya"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={handleNextMonth}
                      className="p-2 rounded-xl bg-white/5 border border-white/15 text-white/80 hover:text-white hover:bg-white/15 active:scale-95 transition-all"
                      title="Bulan Berikutnya"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* 7-Day Column Headers (Sun to Sat with Balinese Wuku Names) */}
                <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-2 text-center select-none">
                  {BALINESE_DAY_NAMES.map((day) => (
                    <div
                      key={day.id}
                      className={`py-1.5 sm:py-2 px-0.5 sm:px-1 rounded-xl bg-white/[0.03] border border-white/5 flex flex-col items-center justify-center ${
                        day.isRed ? "text-[#ff8b94]" : "text-white/80"
                      }`}
                    >
                      <span className="font-heading text-xs sm:text-sm font-bold block">
                        {day.id}
                      </span>
                      <span className="text-[8px] sm:text-[10px] font-subheading text-white/50 block">
                        {day.bali}
                      </span>
                    </div>
                  ))}
                </div>

                {/* The Actual Calendar Days Grid (7 Columns × Weeks) */}
                <div className="grid grid-cols-7 gap-1 sm:gap-2 flex-1">
                  {calendarDays.map((cell, idx) => {
                    // Find all events on this day
                    const dayEvents = cell.isCurrentMonth
                      ? activeYearEvents.filter(
                          (e) => e.month === cell.month && e.dateNum === cell.dateNum
                        )
                      : [];

                    const hasEvent = dayEvents.length > 0;
                    const primaryEvent = dayEvents[0];
                    const isSelected =
                      selectedDate !== null
                        ? selectedDate.day === cell.dateNum &&
                          selectedDate.month === cell.month &&
                          selectedDate.year === cell.year &&
                          cell.isCurrentMonth
                        : selectedEvent !== null &&
                          selectedEvent.month === cell.month &&
                          selectedEvent.dateNum === cell.dateNum &&
                          selectedEvent.year === cell.year &&
                          cell.isCurrentMonth;

                    // Check if today matches client browser date
                    const isToday =
                      todayDate &&
                      todayDate.day === cell.dateNum &&
                      todayDate.month === cell.month &&
                      todayDate.year === cell.year &&
                      cell.isCurrentMonth;

                    const isUtama = dayEvents.some((e) => e.category === "utama");
                    const isPurnamaTilem = dayEvents.some((e) => e.category === "purnama-tilem");
                    const isSunday = idx % 7 === 0;

                    // Filter dimming when category filter is active
                    const isDimmedByCategory =
                      selectedCategory !== "ALL" &&
                      hasEvent &&
                      !dayEvents.some((e) => e.category === selectedCategory);

                    return (
                      <div
                        key={idx}
                        onClick={() => {
                          if (!cell.isCurrentMonth) return;
                          setSelectedDate({ day: cell.dateNum, month: cell.month, year: cell.year });
                          if (primaryEvent) {
                            handleSelectEvent(primaryEvent);
                          } else {
                            setSelectedEvent(null);
                          }
                        }}
                        className={`min-h-[50px] sm:min-h-[82px] lg:min-h-[88px] p-1.5 sm:p-2 rounded-xl sm:rounded-2xl flex flex-col justify-between transition-all duration-200 relative select-none ${
                          !cell.isCurrentMonth
                            ? "bg-white/[0.01] border border-white/[0.03] opacity-25 pointer-events-none"
                            : "cursor-pointer active:scale-95 " +
                              (hasEvent
                                ? "bg-white/[0.04] border border-white/10 hover:border-white/25 hover:bg-white/[0.07]"
                                : "bg-white/[0.02] border border-white/5 hover:border-white/15 hover:bg-white/[0.05]")
                        } ${
                          isSelected
                            ? "ring-2 ring-white/90 bg-white/[0.18] shadow-[0_0_15px_rgba(255,255,255,0.25)] border-white/40 scale-[1.02] z-10"
                            : isToday
                            ? "ring-1.5 ring-emerald-400/70 bg-emerald-500/10 border-emerald-400/30"
                            : ""
                        } ${isDimmedByCategory ? "opacity-30" : ""}`}
                      >
                        {/* Top Bar of Cell: Day Number & Small Dot indicator */}
                        <div className="flex items-center justify-between w-full">
                          <div className="flex items-center gap-1">
                            <span
                              className={`font-heading text-xs sm:text-sm font-bold ${
                                !cell.isCurrentMonth
                                  ? "text-white/30"
                                  : isToday
                                  ? "text-emerald-300"
                                  : isSunday || primaryEvent?.isNationalHoliday
                                  ? "text-[#ff8b94]"
                                  : "text-white"
                              }`}
                            >
                              {cell.dateNum}
                            </span>
                            {isToday && (
                              <span className="hidden sm:inline-block text-[8px] font-subheading font-medium px-1.5 py-0.2 rounded bg-emerald-400/15 text-emerald-300">
                                Hari Ini
                              </span>
                            )}
                          </div>

                          {hasEvent && (
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                isUtama
                                  ? "bg-[#ff4d5a]"
                                  : isPurnamaTilem
                                  ? "bg-[#ffd166]"
                                  : "bg-[#38bdf8]"
                              }`}
                            />
                          )}
                        </div>

                        {/* Event Name as Pure Clean Text on Desktop */}
                        {hasEvent && primaryEvent && (
                          <div className="hidden sm:block mt-auto pt-1.5">
                            <span className="text-[10px] sm:text-[11px] font-subheading font-medium text-white/90 leading-tight line-clamp-2 block">
                              {primaryEvent.shortTitle || primaryEvent.title}
                            </span>
                          </div>
                        )}

                        {/* Mobile Glowing Category Dots (< 640px) */}
                        {hasEvent && (
                          <div className="sm:hidden mt-auto pt-1 flex items-center justify-center gap-1">
                            {dayEvents.slice(0, 3).map((ev, i) => (
                              <span
                                key={i}
                                className={`w-1.5 h-1.5 rounded-full ${
                                  ev.category === "utama"
                                    ? "bg-[#ff3b4e] shadow-[0_0_6px_#ff3b4e]"
                                    : ev.category === "purnama-tilem"
                                    ? "bg-[#ffd166] shadow-[0_0_6px_#ffd166]"
                                    : "bg-[#38bdf8] shadow-[0_0_6px_#38bdf8]"
                                }`}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </LiquidGlassCard>

          </div>

          {/* ==========================================================
              RIGHT: SELECTED EVENT INSPECTOR & MONTH SUMMARY (Symmetrical with Calendar)
              ========================================================== */}
          <div ref={inspectorRef} className="lg:col-span-4 flex flex-col justify-between h-full space-y-4 scroll-mt-24">
            
            {/* Inspector Card: Details of Selected Date */}
            <LiquidGlassCard 
              className="p-5 sm:p-6 shadow-2xl flex-1 flex flex-col justify-between"
              contentClassName="h-full flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-subheading font-bold uppercase tracking-wider text-[#8bd4ff] block mb-1">
                  {selectedEvent ? "Detail Rerainan Terpilih" : "Detail Tanggal Terpilih"}
                </span>

                {selectedEvent ? (
                  <div className="space-y-3 mt-1.5">
                    <div>
                      <span className="font-subheading text-xs text-white/60 block">
                        {selectedEvent.dateStr}
                      </span>
                      <h3 className="font-heading text-xl sm:text-2xl font-black text-white mt-0.5 leading-snug">
                        {selectedEvent.title}
                      </h3>
                      <span className="font-subheading text-xs text-[#ff8b94] font-medium block mt-0.5">
                        {selectedEvent.wukuOrSasih}
                      </span>
                    </div>

                    <p className="font-subheading text-xs sm:text-[13px] text-white/80 leading-relaxed">
                      {selectedEvent.description}
                    </p>

                    <div className="pt-2.5 border-t border-white/10">
                      <span className="text-[10px] font-subheading font-bold text-white/50 uppercase tracking-wider block mb-1.5">
                        Rangkaian Upacara & Peribadatan:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedEvent.rituals.map((r, i) => (
                          <span
                            key={i}
                            className="text-[10px] font-subheading px-2.5 py-0.5 rounded-lg bg-white/5 border border-white/10 text-white/90"
                          >
                            {r}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : selectedDate ? (
                  <div className="space-y-3 mt-1.5">
                    <div>
                      <span className="font-subheading text-xs text-white/60 block">
                        {`${
                          BALINESE_DAY_NAMES[
                            new Date(selectedDate.year, selectedDate.month - 1, selectedDate.day).getDay()
                          ]?.full || ""
                        }, ${selectedDate.day} ${MONTH_NAMES[selectedDate.month - 1]} ${selectedDate.year}`}
                      </span>
                      <h3 className="font-heading text-xl sm:text-2xl font-black text-white mt-0.5 leading-snug">
                        Tidak Ada Rerainan Khusus
                      </h3>
                      <span className="font-subheading text-xs text-[#8bd4ff] font-medium block mt-0.5">
                        Hari Biasa (Rahina Kalender)
                      </span>
                    </div>

                    <p className="font-subheading text-xs sm:text-[13px] text-white/80 leading-relaxed">
                      Tidak ada perayaan rerainan besar atau hari raya khusus Hindu pada tanggal ini. Persembahyangan harian (Tri Sandhya & Yadnya Sesa) tetap dilaksanakan secara rutin.
                    </p>

                    <div className="pt-2.5 border-t border-white/10">
                      <span className="text-[10px] font-subheading font-bold text-white/50 uppercase tracking-wider block mb-1.5">
                        Persembahyangan Harian Rutin:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        <span className="text-[10px] font-subheading px-2.5 py-0.5 rounded-lg bg-white/5 border border-white/10 text-white/90">
                          Tri Sandhya 3 Waktu
                        </span>
                        <span className="text-[10px] font-subheading px-2.5 py-0.5 rounded-lg bg-white/5 border border-white/10 text-white/90">
                          Yadnya Sesa (Saiban)
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="py-8 text-center text-white/60 text-xs">
                    Pilih salah satu tanggal pada kalender untuk melihat rincian persembahyangan.
                  </div>
                )}
              </div>

              {selectedEvent?.isNationalHoliday && (
                <div className="mt-3 p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2 text-xs text-white/80">
                  <Info className="w-4 h-4 text-white/50 shrink-0" />
                  <span>Ditetapkan sebagai Hari Libur Nasional / Cuti Bersama.</span>
                </div>
              )}

              {/* Intra-Month Holy Day Stepper */}
              {currentMonthEvents.length > 1 && (
                <div className="flex items-center justify-between pt-3 mt-3 border-t border-white/10 gap-2">
                  <button
                    disabled={!prevMonthEvent}
                    onClick={() => prevMonthEvent && handleSelectEvent(prevMonthEvent)}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-subheading font-medium transition-all ${
                      prevMonthEvent
                        ? "bg-white/10 hover:bg-white/20 text-white active:scale-95"
                        : "opacity-30 text-white/40 cursor-not-allowed"
                    }`}
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    <span>Sebelumnya</span>
                  </button>
                  <span className="text-[10px] font-subheading text-white/50">
                    {currentEventIndex >= 0 ? `${currentEventIndex + 1} dari ${currentMonthEvents.length}` : ""}
                  </span>
                  <button
                    disabled={!nextMonthEvent}
                    onClick={() => nextMonthEvent && handleSelectEvent(nextMonthEvent)}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-subheading font-medium transition-all ${
                      nextMonthEvent
                        ? "bg-white/10 hover:bg-white/20 text-white active:scale-95"
                        : "opacity-30 text-white/40 cursor-not-allowed"
                    }`}
                  >
                    <span>Berikutnya</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </LiquidGlassCard>

            {/* List of All Holy Days in Current Month */}
            <LiquidGlassCard 
              className="p-5 flex-1 flex flex-col justify-between"
              contentClassName="h-full flex flex-col justify-between"
            >
              <div>
                <span className="text-[11px] font-subheading font-bold uppercase tracking-wider text-white/70 block mb-2.5">
                  Rerainan Bulan {MONTH_NAMES[currentMonth - 1]} {currentYear}:
                </span>

                {currentMonthEvents.length === 0 ? (
                  <span className="text-xs text-white/50 italic block py-4">
                    Tidak ada perayaan rerainan besar pada bulan ini.
                  </span>
                ) : (
                  <div className="space-y-1.5 max-h-[220px] overflow-y-auto pr-1">
                    {currentMonthEvents.map((ev) => (
                      <button
                        key={ev.id}
                        onClick={() => handleSelectEvent(ev)}
                        className={`w-full text-left p-2 rounded-xl border transition-all flex items-center justify-between text-xs ${
                          selectedEvent?.id === ev.id
                            ? "bg-white/10 border-white/30 text-white"
                            : "bg-white/[0.02] border-white/5 text-white/75 hover:bg-white/5 hover:text-white"
                        }`}
                      >
                        <div>
                          <span className="font-heading font-bold block">
                            {ev.dateNum} {MONTH_NAMES[currentMonth - 1]}
                          </span>
                          <span className="font-subheading text-[11px] text-white/60 block line-clamp-1">
                            {ev.shortTitle || ev.title}
                          </span>
                        </div>
                        <span className="text-[10px] font-subheading text-white/40 shrink-0 ml-2">
                          {ev.category === "utama"
                            ? "Utama"
                            : ev.category === "purnama-tilem"
                            ? "Purnama/Tilem"
                            : "Pawukon"}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </LiquidGlassCard>

          </div>

        </div>

      </div>
    </div>
  );
}
