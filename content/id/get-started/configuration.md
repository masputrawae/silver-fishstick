---
title: 'Konfigurasi Dasar'
description: 'Mengatur file konfigurasi untuk situs Hugo.'
date: 2025-07-23T21:00:00+07:00
---

# ⚙️ Konfigurasi Dasar Hugo

Setelah menambahkan tema, kamu perlu mengatur beberapa konfigurasi agar situs bisa berjalan dengan benar. Pengaturan ini ada di file `config.toml` atau `config.yaml`.

Berikut contoh dasar:

```toml
baseURL = "https://contoh.com/"
languageCode = "id"
title = "Situs Hugo Saya"
theme = "coder"
```

## 📄 Penjelasan Konfigurasi

- `baseURL`: Alamat utama situs kamu.
- `languageCode`: Kode bahasa situs (misal: `id`).
- `title`: Judul situs yang muncul di tab browser.
- `theme`: Nama tema yang kamu gunakan.

> Pastikan nama tema sesuai dengan folder di dalam `themes/`.

## 🧪 Tambahan

Untuk multilingual, kamu juga bisa menambahkan:

```toml
defaultContentLanguage = "id"
[languages]
  [languages.id]
    weight = 1
    title = "Situs Saya"
```

---

> Kamu bisa menambahkan konfigurasi lain seperti menu, params, dan output format sesuai kebutuhan situsmu.
