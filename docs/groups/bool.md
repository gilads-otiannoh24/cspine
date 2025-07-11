## ✅ Bool Group Functions

These functions deal with boolean logic and toggling values. They are especially useful for working with flags, toggles, visibility states, and logical checks in CSP-compliant Alpine.js setups.

---

### `toggle`

**What it does**
Toggles the value of a boolean variable between `true` and `false`.

**How it is used**

**DSL Syntax:**

```html
data-cspine="toggle:isVisible"
```

**Explanation:**

- `toggle:` — The command
- `isVisible` — A reference to a boolean variable

**Example:**

```html
<div x-data="{ isVisible: false }">
  <button @click="$_.bool.toggle">Toggle</button>
  <div x-show="isVisible">Now you see me!</div>
</div>
```

With:

```html
data-cspine="toggle:isVisible"
```

Each click will flip `isVisible` between `true` and `false`.

---

### `truthy`

**What it does**
Returns `true` if the value of the given reference is considered **truthy** in JavaScript (`"hello"`, `1`, `[1]`, etc.).

**How it is used**

**DSL Syntax:**

```html
data-cspine="truthy:userInput"
```

**Explanation:**

- Evaluates the `userInput` reference
- Returns `true` if the value is truthy

**Example:**

```html
<div x-data="{ userInput: 'hello' }" x-show="$_.bool.truthy"></div>
```

With:

```html
data-cspine="truthy:userInput"
```

The element is shown because `'hello'` is a truthy value.

---

### `falsy`

**What it does**
Returns `true` if the value of the given reference is **falsy** (`null`, `undefined`, `''`, `0`, `false`, etc.).

**How it is used**

**DSL Syntax:**

```html
data-cspine="falsy:errors"
```

**Explanation:**

- Evaluates `errors`
- Returns `true` if it's falsy

**Example:**

```html
<div x-data="{ errors: null }" x-show="$_.bool.falsy">All clear!</div>
```

With:

```html
data-cspine="falsy:errors"
```

The message "All clear!" is shown when there are no errors.
