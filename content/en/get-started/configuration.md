---
title: 'Basic Configuration'
description: 'Set up the config file for your Hugo site.'
date: 2025-07-23T21:00:00+07:00
---

# ⚙️ Basic Hugo Configuration

After adding a theme, the next step is configuring the site to make everything work smoothly. The main config file is usually `config.toml` or `config.yaml`.

Here’s a basic example:

```toml
baseURL = "https://example.com/"
languageCode = "en"
title = "My Hugo Site"
theme = "coder"
```

## 📄 Configuration Breakdown

- `baseURL`: The main site URL.
- `languageCode`: Language code (e.g., `en`).
- `title`: The title of your site.
- `theme`: The theme you’re using.

> Make sure the theme name matches the folder inside `themes/`.

## 🧪 Extra: Multilingual

For multilingual sites:

```toml
defaultContentLanguage = "en"
[languages]
  [languages.en]
    weight = 1
    title = "My Site"
```

---

> You can add more options like menus, params, and output formats as needed.
