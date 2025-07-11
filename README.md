# CSPine v2 🧠✨

> **Composable State & Behavior Management for Alpine.js (CSP Build Ready)**  
> Write compact, expressive logic with a DSL that works in CSP-restricted environments.

---

## 🚀 Why CSPine?

When using Alpine.js in a CSP-restricted environment (e.g., with strict Content Security Policies), you must switch to the CSP build — which means removing all inline JavaScript from your HTML. While this enforces security, it also takes away the elegance and simplicity Alpine is known for.

CSPine bridges that gap.
It restores the declarative power of Alpine's normal build by introducing a clean, expressive DSL that works entirely within Alpine's CSP-safe environment — without bloating your JavaScript code or repeating the same logic across components.

🔹 Write less, do more
🔹 Avoid repetition and bulky JavaScript functions
🔹 Maintain clean and maintainable templates
🔹 Enhance Alpine’s power with structured, testable expressions

✅ What CSPine brings to the table
✅ CSP-friendly by design
✅ Tiny DSL with casting, expressions & arguments
✅ Function reuse through groups ($_.state.set, $_.ui.classToggle, etc.)
✅ Cleaner code: fewer JS functions in your Alpine.data()
✅ Built for real-world Alpine CSP use cases

---

## 📦 Installation

Using cdn:

<!-- TODO Update cdn link -->

```html Copy Edit
<script
  src="https://unpkg.com/@gilads-otiannoh24/cspine@latest/dist/cdn.min.js"
  type="module"
></script>

<!-- Ensure to include Alpine.js csp build -->
<script
  defer
  src="https://cdn.jsdelivr.net/npm/@alpinejs/csp@3.x.x/dist/cdn.min.js"
></script>
```

Or via npm (soon):

```bash
npm i @gilads-otiannoh24/cspine
```

Then in your Alpine bootfile:

```js
import Alpine from "@alpinejs/csp";
import CSPine from "@gilads-otiannoh24/cspine";

CSPine.config = {
  /* any config  goes here */
};

Alpine.plugin(CSPine.plugin);
Alpine.start();
```

Example(v2)

```html
<!-- Set 'flag' to true on click -->
<div data-cspine="set:flag->true(bool)" @click="$_state.set"></div>

<!-- Alert with arguments -->
<div
  data-cspine='alert("Hello!"(string), $store.user.name(string), 3000(number))'
></div>

<!-- Command-specific arguments -->
<div
  data-cspine="set:ready->true(bool)|event='mouseover'; set:flag->false(bool)|event='click'"
></div>
```

---

:

## 🧩 Internal Structure of CSPine

CSPine is designed to minimize JavaScript repetition and maximize reusability across Alpine.js components in CSP environments.

### 🔧 Utility Groups

Internally, CSPine organizes its logic into utility groups, each focused on a category of common tasks you'd normally have to implement manually within every Alpine.data() object.

Each group exposes pure utility functions via the special Alpine Magic helper $\_, allowing you to call them like:

```html
@click="$_.state.set"
```

### 🔹 Example Utility Groups

| Group   | Purpose                                              |
| ------- | ---------------------------------------------------- |
| `state` | Manage data state (`set`, `not`, `reset`, etc.)      |
| `ui`    | UI manipulation (`classToggle`, `class`, etc.)       |
| `bool`  | Manages boolean values (`truthy`, `falsy`, `toggle`) |

You can invoke any function using the DSL, and pass in arguments via your HTML using the data-cspine attribute:

```html
<div data-cspine="set:isOpen->true(bool)"></div>
```

### 🔒 Why This Matters

Because Alpine’s CSP build disallows inline expressions, you'd usually end up moving every little piece of logic into the component definition. This is repetitive, hard to test, and defeats the simplicity Alpine is known for.

CSPine avoids this problem by:

> Encapsulating logic in reusable, grouped functions.

> Letting you declaratively invoke logic via the DSL.

> Minimizing custom Alpine.data() JS code.

---

## 🔑 Syntax Features

### ✅ Core Format

```txt Copy Edit
command:target->value(cast)|positionalArg1, key1='value1', ...
```

### ✅ Examples

Set a value

```html
<div data-cspine="set:isOpen->true(bool)"></div>
```

Provide cast and fallback

```html
<div data-cspine="set:count->'10'(string)|cast='number', default='0'"></div>
```

Attach multiple commands

```html
<div data-cspine="set:x->5(number); set:y->user.id(string)"></div>
```

Command with function call

```html
<div data-cspine='alert("Welcome!"(string), $store.user.email(string))'></div>
```

---

## 🪄 Command-Specific Arguments (CSA)

You can now pass arguments specific to a command using the pipe (|) syntax.

```html
<div
  data-cspine="toggle:flag->true(bool)|trueClass='text-green', falseClass='text-red'"
></div>
```

---

## ✅ Reserved CSA Keywords

| Keyword | Description                     |
| ------- | ------------------------------- |
| event   | Specify DOM event for execution |
| cast    | Force-cast a dynamic variable   |
| default | Fallback if resolution fails    |

> 💡 **Note**: Escape reserved names with `\` if used as keys:  
> `\event='value'`

## 💡 Magic Utilities Support

CSPine fully supports Alpine magic values like $store, $refs, $el, etc.

```html
<div data-cspine="log:$store.user.name"></div>
```

---

## 📘 Documentation

✅ Full Docs →

📄 Looking for v1? Check the legacy version:
📜 [View CSPine v1 Docs](docs/v1.md)

---

## 🧪 Testing

CSPine is fully unit tested using Vitest.
You can run tests with:

```bash
npm run test
```

---

## 🛠️ Roadmap

- [x] Full DSL v2
- [x] Tokenizer overhaul with CSA
- [x] AST support for calls & normal
- [x] Reserved keyword handling
- [ ] Visual Studio Code extension
- [ ] Interactive playground
- [ ] More command groups (e.g., network, form)

---

## 🧑‍💻 Contributing

Contributions welcome! Open issues or submit PRs.
