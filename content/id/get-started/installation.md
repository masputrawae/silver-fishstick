---
title: 'Instalasi Hugo'
description: 'Panduan untuk menginstal Hugo di berbagai sistem operasi.'
date: 2025-07-23T20:15:00+07:00
---

# 🛠 Instalasi Hugo

Hugo bisa diinstal di Linux, macOS, maupun Windows. Gunakan cara yang paling sesuai dengan sistem kamu.

## 📦 Linux

```bash
sudo apt install hugo
```

Atau jika ingin versi terbaru:

```bash
sudo snap install hugo --channel=extended
```

## 🍏 macOS

Jika kamu menggunakan Homebrew:

```bash
brew install hugo
```

Untuk versi extended (diperlukan untuk SCSS):

```bash
brew install hugo --HEAD
```

## 🪟 Windows

Gunakan [choco](https://chocolatey.org/):

```powershell
choco install hugo -confirm
```

Atau unduh binary langsung dari halaman [rilis Hugo](https://github.com/gohugoio/hugo/releases).

## 🧪 Verifikasi Instalasi

Setelah instalasi selesai, jalankan:

```bash
hugo version
```

Jika berhasil, kamu akan melihat versi Hugo yang terpasang.

---

> Tip: Gunakan Hugo versi extended jika kamu menggunakan SCSS atau tema dengan fitur lanjutan.
