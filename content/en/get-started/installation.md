---
title: 'Installing Hugo'
description: 'How to install Hugo on Linux, macOS, and Windows.'
date: 2025-07-23T20:15:00+07:00
---

# 🛠 Installing Hugo

Hugo can be installed on Linux, macOS, or Windows. Choose the method that fits your system.

## 📦 Linux

```bash
sudo apt install hugo
```

Or for the latest version:

```bash
sudo snap install hugo --channel=extended
```

## 🍏 macOS

Using Homebrew:

```bash
brew install hugo
```

For the extended version (recommended for SCSS):

```bash
brew install hugo --HEAD
```

## 🪟 Windows

Using [Chocolatey](https://chocolatey.org/):

```powershell
choco install hugo -confirm
```

Or download it manually from the [Hugo releases page](https://github.com/gohugoio/hugo/releases).

## 🧪 Verify Installation

After installation, run:

```bash
hugo version
```

If successful, it will display the installed Hugo version.

---

> Tip: Use the extended version if you're using SCSS or themes that require it.
