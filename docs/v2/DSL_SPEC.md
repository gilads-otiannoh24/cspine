# CSpine DSL Specification (Draft for v2)

> Version: Draft 0.1
> Author: \Ochieng Ian Otieno
> Purpose: Define the syntax and grammar for CSpine's inline DSL for attribute-based data operations.

---

## 📌 Overview

CSpine's v2 introduces a compact attribute syntax for variable operations and logic directly in HTML using a mini-language. This document outlines the structure, grammar, and use-cases of this Domain-Specific Language (DSL).

### ✅ Goals

- Reduce verbosity of `data-*` attributes.
- Create a consistent and readable inline syntax.
- Support assignments, casting, math operations, and logic.
- Keep it easily parseable.

---

## 🧬 EBNF Grammar

```ebnf
attribute        = command ":" expression ;

command          = identifier ;                       (* e.g. set, bind, if *)

expression       = operation , [ "->" , target ] , [ cast ] ;

operation        = reference , [ operator , operand ] ;

reference        = scoped_identifier ;

scoped_identifier= [ "@" ] , identifier , { "." , identifier } ;

operator         = "+=" | "-=" | "*=" | "/=" | "%=" | "=" ;

operand          = literal | reference ;

target           = scoped_identifier | literal ;

cast             = "(" , type , ")" ;

literal          = number | string | boolean ;

number           = digit , { digit } ;
string           = '"' , { character } , '"' ;
boolean          = "true" | "false" ;

type             = "number" | "string" | "bool" | "json" | identifier ;

identifier       = letter , { letter | digit | "_" } ;

digit            = "0" | ... | "9" ;
letter           = "a" | ... | "z" | "A" | ... | "Z" ;
character        = ? any printable character except control characters and quotes ? ;
```

---

## 🔧 Symbol Reference

| Symbol         | Meaning              | Example        |
| -------------- | -------------------- | -------------- |
| `:`            | Command prefix       | `set:user.age` |
| `->`           | Assignment arrow     | `set:x->45`    |
| `()`           | Type casting         | `45(number)`   |
| `@`            | Scoped reference     | `@this.value`  |
| `+=` `-=` etc. | Arithmetic operators | `score+=10`    |
| `=`            | Direct assignment    | `x=5`          |

---

## 🧪 Examples

### Basic assignment with cast

```html
<input data-var="set:user.age->45(number)" />
```

### From scoped value to form field

```html
<input data-var="set:@this.input->form.email(string)" />
```

### Math operation

```html
<button data-var="set:user.points+=5(number)">Add Points</button>
```

### Boolean value

```html
<div data-var="set:isReady->true(bool)"></div>
```

---

## 📝 TODOs for v2

- [ ] Support conditionals: `if:user.age>18->canVote(bool)`
- [ ] Parser implementation for DSL in JavaScript
- [ ] Runtime casting engine
- [ ] Integration with reactive engine
- [ ] Conflict resolution with legacy attributes
- [ ] Design fallback for unsupported browsers
- [ ] Developer warnings for malformed syntax

---

## 📂 File Location Suggestion

- `/parser/dsl.ts` → Core tokenizer & parser
- `/docs/DSL-SPEC.md` → This file (draft spec)
- `/spec/v2-outline.md` → Additional ideas not yet covered in grammar

---

## 🚀 Roadmap Notes

- v1 will use explicit `data-var`, `data-value`, etc.
- v2 will introduce DSL syntax behind opt-in flag: `data-cspine-mode="v2"`
- Eventually migrate examples and internal tools to use compact DSL

---

## 📣 Contributing Ideas

Have thoughts? Add proposals or symbol suggestions to `spec/v2-outline.md`, or open a feature flag idea in the repo.

---
