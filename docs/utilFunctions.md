# Util Group Functions

The Util group functions are used to perform various utility operations on the data.

### Call Funtion

The Call function is used to call another function.

Datasets used are:

`data-call` - Used for chaining the functions required to be called.

`data-callcast` - Used for casting the data type of the input data.

#### Usage example

```html
<p data-call="$_.state.inc" data-var="count" data x-init="$_.util.call"></p>
```

##### Operators

`->` - Used to chain your functions incase you want to call more than one function (this is probalby where you may find this function most helpful).

![Important](https://img.shields.io/badge/important-blue)
When using this function you can call typical alpinejs methods and if you ensure to resolve the alpine context you are using by passing an alpine context as an argument and either uing it as it is or prefering it if is provided/not undefined.
