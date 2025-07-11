## 🧠 State Group Commands in CSPine

CSPine’s `state` group provides utility functions for working with state and reactivity within Alpine.js' CSP-compliant builds. Each function can be triggered declaratively using CSPine DSL. Below is a reference to each command under the `state` group:

---

### `set`

**What it does:** Sets a value to a state variable.

**How it’s used:**

```html
<div data-cspine="set:count->10(number)"></div>
```

**Special:** Supports type casting and dynamic references. Pairs well with command-specific arguments.

---

### `inc`

**What it does:** Increments a numeric state value by 1 or a given step.

**How it’s used:**

```html
<div data-cspine="inc:count"></div>
```

**Special:** Can be paired with command-specific arguments like `step=2` to control the increment.

---

### `dec`

**What it does:** Decrements a numeric state value by 1 or a given step.

**How it’s used:**

```html
<div data-cspine="dec:count"></div>
```

**Special:** Accepts `step` as a command-specific argument.

---

### `empty`

**What it does:** Checks if a reference is empty (array, string, or object).

**How it’s used:**

```html
<div x-show="$_state.empty" data-cspine="empty:items"></div>
```

**Special:** Returns a boolean. Useful in conditional rendering.

---

### `reset`

**What it does:** Resets a variable to its initial/default state.

**How it’s used:**

```html
<button data-cspine="reset:formState"></button>
```

**Special:** Supports nested paths like `formState.name`.

---

### `not`

**What it does:** Returns the logical negation of a boolean reference.

**How it’s used:**

```html
<div x-show="$_state.not" data-cspine="not:visible"></div>
```

**Special:** Can be casted and used directly in conditions.

---

### `type`

**What it does:** Returns the type of the evaluated reference (e.g. "string", "number").

**How it’s used:**

```html
<div x-text="$_state.type" data-cspine="type:status"></div>
```

**Special:** Useful in dynamic evaluations or debugging.

---

### `equals`

**What it does:** Checks if a reference equals a target value.

**How it’s used:**

```html
<div x-show="$_state.equals" data-cspine="equals:count->10(number)"></div>
```

**Special:** Supports casting for accurate comparison.

---

### `notEquals`

**What it does:** Checks if a reference does _not_ equal a target value.

**How it’s used:**

```html
<div
  x-show="$_state.notEquals"
  data-cspine="notEquals:status->'inactive'(string)"
></div>
```

**Special:** Complement of `equals`. Works well with casting.

---

### `greaterThan`

**What it does:** Checks if a reference is greater than a value.

**How it’s used:**

```html
<div
  x-show="$_state.greaterThan"
  data-cspine="greaterThan:count->5(number)"
></div>
```

**Special:** Strict comparison. Casts if necessary.

---

### `lessThan`

**What it does:** Checks if a reference is less than a value.

**How it’s used:**

```html
<div x-show="$_state.lessThan" data-cspine="lessThan:count->5(number)"></div>
```

**Special:** Supports numeric and date values.

---

### `greaterThanOrEqual`

**What it does:** Checks if a reference is greater than or equal to a value.

**How it’s used:**

```html
<div
  x-show="$_state.greaterThanOrEqual"
  data-cspine="greaterThanOrEqual:count->10(number)"
></div>
```

---

### `lessThanOrEqual`

**What it does:** Checks if a reference is less than or equal to a value.

**How it’s used:**

```html
<div
  x-show="$_state.lessThanOrEqual"
  data-cspine="lessThanOrEqual:count->10(number)"
></div>
```

---

✅ All these commands benefit from CSPine’s DSL syntax, reactive evaluation, type casting, and declarative architecture.

You can bind them to DOM events using `event='click'` and related arguments for even more control.
