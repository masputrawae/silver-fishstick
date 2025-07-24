---
title: 'Cloning a Hugo Theme'
description: 'How to clone a theme into your Hugo project using Git.'
date: 2025-07-23T20:30:00+07:00
---

# 🎨 Cloning a Hugo Theme

Once you’ve created a new Hugo site, the next step is to add a theme. There are multiple ways to add a theme, but cloning via Git is the most flexible.

## 📁 Hugo Project Structure

Typically, your project folder will look like this:

```

my-site/
├── config.toml
├── content/
├── themes/
└── ...

```

We’ll place the theme inside the `themes` directory.

## 🔗 Clone a Theme

Example: clone the [hugo-coder](https://github.com/luizdepra/hugo-coder) theme:

```bash
cd my-site
git clone https://github.com/luizdepra/hugo-coder.git themes/coder
```

> Make sure the folder name matches the theme name in `config.toml`.

## 🧬 Alternative: Git Submodule

If you want better Git integration, use a submodule:

```bash
git submodule add https://github.com/luizdepra/hugo-coder.git themes/coder
```

---

> Don’t forget to set the theme name in your config file.
