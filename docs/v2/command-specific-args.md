# Command Specific Arguments

When using cspine you may need to provide extra data to your cspine command based on the command requirements. To enalbe this to happen the dsl has introduced a way to provide command specific arguemtns to your command.

Here is the general syntax:

```text
set:x->10|key='value1','value2';
```

As you can see you can provide named arguments or positional arguments
`key='value1'` - named argument
`'value2'` - positional argument

Ensure to check out what each command/function requires before using it.

# V2 Reserved Keywords for Command-Specific Arguments

Version 2 of the CSPine DSL introduces **command-specific arguments** that enhance control over how individual commands behave, especially in relation to DOM events. These arguments are passed inline with the DSL command string and can be either **positional** or **named**.

This document outlines the **reserved keywords** available for named arguments. These reserved keys add expressive power to DSL commands while maintaining a clean syntax in a single `data-cspine` attribute.

---

## 🎯 Purpose

Reserved keywords are interpreted **differently** from regular arguments. They control:

- When a command should execute
- On which event(s) it should run
- Whether to prevent default behavior
- Scoping and more

---

## ✅ Syntax Overview

You can provide named arguments like this:

```text
set:ready->true(bool)|'user',event='click',once='true';
```

Multiple commands can be chained

```text
set:flag->false(bool)|'foo',event='mouseover';
alert('Hello'(string))|event='click',once='true';
```

---

## 📘 Reserved Keywords

| Keyword   | Type                                   | Description                                                                                                                                                                                                      |
| --------- | -------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `event`   | string                                 | Event name(s) (e.g. `'click'`, `'mouseover'`, or `'click,focus'`). Tells the resolver to run the command only when that event is triggered. If omitted, the command runs on **all events** bound to the handler. |
| `when`    | string                                 | AlpineJS expression (e.g. `'user.loggedIn'`) that is evaluated before executing the command. If false, command is skipped.                                                                                       |
| `once`    | boolean string (`'true'` or `'false'`) | If `'true'`, the command runs only once for that element.                                                                                                                                                        |
| `prevent` | boolean string                         | If `'true'`, `event.preventDefault()` is called.                                                                                                                                                                 |
| `stop`    | boolean string                         | If `'true'`, `event.stopPropagation()` is called.                                                                                                                                                                |
| `delay`   | number (as string)                     | Delay in milliseconds before command execution. Example: `delay='500'`                                                                                                                                           |
| `id`      | string                                 | Optional ID used to reference or debug this command (e.g. `'loginSetter'`).                                                                                                                                      |
| `scope`   | string                                 | Logical grouping tag or namespace. Helps in debugging or conditional filtering.                                                                                                                                  |

```text
set:visible->true(bool)|'session',event='click',once='true',id='visibilityCommand';

alert('Hi'(string))|event='click',when='user.loggedIn',prevent='true';
```

## 🛡️ Fallback Behavior

If event is not provided, the command is considered a fallback and executes for all events on the element.

Reserved keys can still be used as regular names (e.g., key='event'), but should not conflict with intended reserved behavior.

Reserved keywords are parsed into the meta object of the final AST.

To use a reserver keyword as an argument pass it with `\\` preceding it eg., `\\event="not-a-real-event"`

## 🛠️ Integration Hint

In your runtime handler (e.g. Alpine’s @click="$\_handle"), you can filter and execute commands based on meta.event, meta.when, and meta.once.

## 📌 Final Notes

All reserved values must be strings, even for booleans and numbers.

Multiple events can be defined using a comma: event='click,focus'

Avoid using reserved keywords as variable names unless escaping or isolating them clearly.

## 📂 Future Keywords (Planned)

These are candidates for future support:

debounce — like delay, but merges repeated calls

throttle — limit execution to once every n ms

log — log command execution to console

confirm — ask for user confirmation before running

© 2025 CSPine DSL v2 — Built for power and clarity.
