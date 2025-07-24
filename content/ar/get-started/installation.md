---
title: "تثبيت Hugo"
description: "كيفية تثبيت Hugo على أنظمة Linux وmacOS وWindows."
date: 2025-07-23T20:15:00+07:00
---

# 🛠 تثبيت Hugo

يمكن تثبيت Hugo على أنظمة Linux أو macOS أو Windows. اختر الطريقة المناسبة لنظامك.

## 📦 Linux

```bash
sudo apt install hugo
````

أو للحصول على أحدث إصدار:

```bash
sudo snap install hugo --channel=extended
```

## 🍏 macOS

إذا كنت تستخدم Homebrew:

```bash
brew install hugo
```

للإصدار الموسّع (مطلوب لـ SCSS):

```bash
brew install hugo --HEAD
```

## 🪟 Windows

باستخدام [Chocolatey](https://chocolatey.org/):

```powershell
choco install hugo -confirm
```

أو قم بتنزيله يدويًا من [صفحة الإصدارات](https://github.com/gohugoio/hugo/releases).

## 🧪 التحقق من التثبيت

بعد التثبيت، نفّذ الأمر:

```bash
hugo version
```

إذا نجح، سترى رقم إصدار Hugo المثبت.

---

> ملاحظة: استخدم الإصدار الموسّع إذا كنت تستخدم SCSS أو قالبًا يحتاج إليه.
