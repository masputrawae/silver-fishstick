---
title: 'Klon Tema Hugo'
description: 'Langkah untuk mengkloning tema ke dalam proyek Hugo menggunakan Git.'
date: 2025-07-23T20:30:00+07:00
---

# 🎨 Klon Tema Hugo

Setelah membuat situs baru dengan Hugo, langkah selanjutnya adalah menambahkan tema. Tema bisa ditambahkan dengan beberapa cara, tapi yang paling fleksibel adalah melalui Git.

## 📁 Struktur Folder Hugo

Biasanya, struktur awal proyek Hugo seperti ini:

```

my-site/
├── config.toml
├── content/
├── themes/
└── ...

```

Kita akan menempatkan tema di dalam folder `themes`.

## 🔗 Klon Tema

Contoh: mengkloning tema [hugo-coder](https://github.com/luizdepra/hugo-coder):

```bash
cd my-site
git clone https://github.com/luizdepra/hugo-coder.git themes/coder
```

> Pastikan nama folder tema sesuai dengan yang kamu referensikan di `config.toml`.

## 🧬 Alternatif: Git Submodule

Kalau kamu ingin integrasi lebih rapi dengan Git, kamu bisa menambahkan sebagai submodule:

```bash
git submodule add https://github.com/luizdepra/hugo-coder.git themes/coder
```

---

> Jangan lupa ubah file konfigurasi untuk menunjuk ke tema yang kamu gunakan.
