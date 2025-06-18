# 🦴 CSPine — CSP-Safe Utilities for Alpine.js

**CSPine** is a feature-rich utility plugin for Alpine.js that brings powerful, expressive behavior to your HTML without violating Content Security Policy (CSP) rules.

> ✨ Declarative. 🔐 Secure. ⚡ Lightweight (~20–30KB when fully built).

---

## 🚀 Why CSPine?

Alpine is awesome, but writing inline JavaScript breaks CSP. CSPine solves this by introducing a declarative, attribute-driven syntax you can use safely — no inline scripts required.

Example:

```html
<button data-var="count" @click="$_.state.inc">+</button>
<span x-text="count"></span>
```

No x-on:click="count++" needed. CSPine handles the logic internally.
Secure and maintainable.

---

## 🔧 Installation

Using cdn:

```html Copy Edit
<script
  defer
  src="https://cdn.example.com/cspine.min.js"
  type="module"
></script>
```

Or via npm (soon):

```bash Copy Edit
npm i @gilads-otiannoh24/cspine
```

Then in your Alpine bootfile:

```js Copy Edit
import Alpine from "@alpinejs/csp";
import CSPine from "@gilads-otiannoh24/cspine";

CSPine.config = {
  /* any config  goes here */
};

Alpine.plugin(CSPine.plugin);
Alpine.start();
```

---

## 🧩 Features

| Category       | Functions                                           |
| -------------- | --------------------------------------------------- |
| 📊 **State**   | `inc`, `dec`, `toggle`, `reset`                     |
| 🧠 **Logic**   | `call`, `bindTo`, `switch`                          |
| 🎛️ **UI**      | `classToggle`, `styleSet`, `showIf` _(coming soon)_ |
| 📦 **Storage** | `persist`, `loadFrom` _(coming soon)_               |

Each function uses a data-\* or CSP-safe @event format like: html Copy Edit

```html
<div data-bind-to="total=price * qty"></div>
<button data-call="submitForm"></button>
```

### ✅ Example

Here is a simple counter implementation with CSPine:

```html Copy Edit
<div x-data="Counter">
  <button @click="$_.state.inc" data-var="count">+</button>
  <button @click="$_.state.dec" data-var="count">-</button>
  <p x-text="count"></p>
</div>

<script>
  document.addEventListener("alpine:init", () => {
    Alpine.data("Counter", () => ({ count: 0 }));
  });
</script>
```

## 🧪 Tested & Trusted

CSPine is tested using Vitest + jsdom with full support for
CSP builds (@alpinejs/csp). Test coverage is designed to simulate real-world DOM
updates without violating CSP headers.

## 📦 Bundle Size

CSPine is modular. Import
only what you need — full build stays under 30KB when gzipped. Much smaller than
rewriting utility JS for every project.

## 💬 Community & Feedback

CSPine is in early development. Feedback, ideas, and contributions are very welcome! 🐛 Found
a bug? 🧠 Want to suggest a new function? 🛠️ Interested in contributing? Open an
issue or pull request on GitHub.

## 📄 License

MIT © 2025 [gilads-otiannoh24]
