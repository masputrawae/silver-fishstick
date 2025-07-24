---
title: "استنساخ سمة Hugo"
description: "طريقة استنساخ سمة إلى مشروع Hugo باستخدام Git."
date: 2025-07-23T20:30:00+07:00
---

# 🎨 استنساخ سمة Hugo

بعد إنشاء موقعك الجديد باستخدام Hugo، الخطوة التالية هي إضافة سمة (Theme). يمكن إضافة السمة بعدة طرق، وأكثرها مرونة هو عبر Git.

## 📁 هيكل مجلد Hugo

عادةً ما يكون هيكل المشروع بهذا الشكل:

````

my-site/
├── config.toml
├── content/
├── themes/
└── ...

````

سنضع السمة داخل مجلد `themes`.

## 🔗 استنساخ السمة

مثال: استنساخ سمة [hugo-coder](https://github.com/luizdepra/hugo-coder):

```bash
cd my-site
git clone https://github.com/luizdepra/hugo-coder.git themes/coder
````

> تأكد من أن اسم المجلد يطابق الاسم المذكور في `config.toml`.

## 🧬 بديل: Git Submodule

إذا كنت تفضل تكاملًا أفضل مع Git، يمكنك استخدام submodule:

```bash
git submodule add https://github.com/luizdepra/hugo-coder.git themes/coder
```

---

> لا تنس تعديل إعدادات `config.toml` لاستخدام السمة المستنسخة.

```

---

Siap lanjut ke `configuration.md`, atau kamu mau sekaligus langsung semua file `_index.md` di `tutorial/` setelah itu?
