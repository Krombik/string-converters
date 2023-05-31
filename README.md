# string-converters

A lightweight and versatile utility for converting various data types. It provides a set of converters that can be used to parse and stringify different values.

## Installation

using npm:

```
npm install --save string-converters
```

or yarn:

```
yarn add string-converters
```

---

## API

- [Converter](#converter)
- [booleanConverter](#booleanconverter)
- [numberConverter](#numberconverter)
- [stringConverter](#stringconverter)
- [createArrayConverter](#createarrayconverter)
- [createOneOfConverter](#createoneofconverter)

### Converter

```ts
type Converter<T> = {
  /**
   * Serializes the specified value into a string.
   *
   * @param value - The value to be serialized.
   * @returns The serialized value as a string.
   */
  stringify(value: T): string;
  /**
   * Parses the specified string and returns the deserialized value.
   *
   * @param value - The string to be parsed.
   * @returns The deserialized value.
   */
  parse(value: string): T;
};
```

---

### booleanConverter

```ts
const booleanConverter: Converter<boolean>;
```

The `booleanConverter` is a utility that provides parsing and stringifying functionality for boolean values.

```ts
import booleanConverter from "string-converters/booleanConverter";

const value = "false";
const parsedValue = booleanConverter.parse(value);
console.log(parsedValue); // Output: false (boolean)

const booleanValue = true;
const stringValue = booleanConverter.stringify(booleanValue);
console.log(stringValue); // Output: "true" (string)
```

---

### numberConverter

```ts
const numberConverter: Converter<number>;
```

The `numberConverter` is a utility that provides parsing and stringifying functionality for number values.

```js
import numberConverter from "string-converters/numberConverter";

const value = "3.14";
const parsedValue = numberConverter.parse(value);
console.log(parsedValue); // Output: 3.14 (number)

const numberValue = 42;
const stringValue = numberConverter.stringify(numberValue);
console.log(stringValue); // Output: "42" (string)

// Throws an error because 'NaN' is not a number
numberConverter.parse("NaN");
```

---

### stringConverter

```ts
const stringConverter: Converter<string>;
```

The `stringConverter` is a utility that provides a passthrough functionality for string values. It doesn't perform any conversion and simply returns the input value as-is.

```js
import stringConverter from "string-converters/stringConverter";

const value = "Hello, World!";
const parsedValue = stringConverter.parse(value);
console.log(parsedValue); // Output: "Hello, World!" (string)

const stringValue = "Hello, World!";
const result = stringConverter.stringify(stringValue);
console.log(result); // Output: "Hello, World!" (string)
```

---

### createArrayConverter

```ts
const createArrayConverter: <T>(
  itemConverter: Converter<T>,
  separator?: string
) => Converter<T[]>;
```

The `createArrayConverter` is a utility function that creates a converter for arrays. It provides parsing and stringifying functionality for array values, using a specified item converter and separator.

```js
import createArrayConverter from "string-converters/createArrayConverter";
import stringConverter from "string-converters/stringConverter";

const itemConverter = stringConverter; // The converter for array items
const separator = ";"; // Custom separator

const arrayConverter = createArrayConverter(itemConverter, separator);

const value = "apple;banana;cherry";
const parsedValue = arrayConverter.parse(value);
console.log(parsedValue); // Output: ['apple', 'banana', 'cherry'] (array)

const arrayValue = ["apple", "banana", "cherry"];
const stringValue = arrayConverter.stringify(arrayValue);
console.log(stringValue); // Output: "apple;banana;cherry" (string)
```

---

### createOneOfConverter

```ts
type AnyArray<T> = Array<T> | ReadonlyArray<T>;
type ValueOf<T> = T extends AnyArray<infer K>
  ? K
  : T extends {}
  ? T[keyof T]
  : never;
type Generalize<T> = T extends string ? string : T extends number ? number : T;

const createOneOfConverter: <const T extends {} | []>(
  generalConverter: Converter<Generalize<ValueOf<T>>>,
  possibleValues: T
) => Converter<ValueOf<T>>;
```

The `createOneOfConverter` is a utility function that creates a converter for values that can only be one of the specified options. It provides parsing and stringifying functionality for such values, using a general converter and a set of possible values.

```js
import createOneOfConverter from "string-converters/createOneOfConverter";
import stringConverter from "string-converters/stringConverter";

const generalConverter = stringConverter; // The general converter for the value type
const possibleValues = ["option1", "option2", "option3"];
const anotherPossibleValues = {
  OPTION_1: "option1",
  OPTION_2: "option2",
  OPTION_1: "option3",
};

const oneOfConverter = createOneOfConverter(generalConverter, possibleValues);

const value = "option2";
const parsedValue = oneOfConverter.parse(value);
console.log(parsedValue); // Output: 'option2'

const optionValue = "option1";
const stringValue = oneOfConverter.stringify(optionValue);
console.log(stringValue); // Output: 'option1'

// Throws an error because 'option4' does not exist in possibleValues
oneOfConverter.parse("option4");
```

---

## License

MIT © [Krombik](https://github.com/Krombik)
