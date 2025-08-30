## 🧩 UI Group Functions

These functions deal with styling and class manipulation of HTML elements, enhancing dynamic UI behaviors without writing manual logic inside Alpine's `data`.

### `classToggle`

**What it does**
Toggles one or more classes on an element based on a reactive condition or logic. It's especially useful for conditionally styling elements when some value changes.

**How it is used**

**DSL Syntax:**

```html
data-cspine="classtoggle:someConditionRef|'class-a','class-b'"
```

**Explanation:**

- `classtoggle:` — The command
- `someConditionRef` — A reference to a boolean-like value
- Pipe `|` introduces the arguments (in this case, class names)
- `'class-a', 'class-b'` — The classes to toggle when the condition is truthy

**Example:**

The x-data is inline here but remember when uing csp build use `Alpine.data('data-object-name')`

```html
<div
  x-data="{ isActive: true }"
  class="$_.ui.classToggle"
  data-cspine="classtoggle:isActive|'highlight','visible'"
></div>
```

If `isActive` is `true`, the element becomes:

```html
<div class="visible base highlight"></div>
```

Otherwise, it remains:

```html
<div class="base"></div>
```

---

### `class`

**What it does**
Selects a class based on the current value of a reactive variable. Think of it as a switch-case for class names.

**How it is used**

**DSL Syntax:**

```html
data-cspine="class:status|success='text-green',warning='text-yellow',error='text-red',default='text-gray'"
```

**Explanation:**

- `class:` — The command
- `status` — A reference (e.g., `status = 'success'`)
- Pipe `|` introduces **named arguments** mapping status values to classes
- `default` — A reserved word escaped using `\`, acts as a fallback

**Example:**

```html
<div
  x-data="{ status: 'success' }"
  data-cspine="class:status|success='text-green',warning='text-yellow',error='text-red',default='text-gray'"
></div>
```

If `status = 'success'`, the output is:

```html
<div class="text-green"></div>
```

If `status = 'unknown'`, the fallback applies:

```html
<div class="text-gray"></div>
```
