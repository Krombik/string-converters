import { Converter } from "../types";

type AnyArray<T> = Array<T> | ReadonlyArray<T>;

type ValueOf<T> = T extends AnyArray<infer K>
  ? K
  : T extends {}
  ? T[keyof T]
  : never;

type Generalize<T> = T extends string ? string : T extends number ? number : T;

const getError = (value: any, arr: any[]) =>
  new Error(`${value} is not found in [${arr.join(", ")}]`);

/**
 * Creates a converter for values that should be one of the specified options.
 *
 * @template T - The type of the possible values.
 * @param {Converter<Generalize<ValueOf<T>>>} generalConverter - The converter for the generalized value type.
 * @param {T} possibleValues - The possible values that the input should match.
 * @returns {Converter<ValueOf<T>>} The converter for the specified options.
 */
const createOneOfConverter = <const T extends {} | []>(
  generalConverter: Converter<Generalize<ValueOf<T>>>,
  possibleValues: T
): Converter<ValueOf<T>> => {
  const arr: ValueOf<T>[] = Array.isArray(possibleValues)
    ? possibleValues
    : Object.values(possibleValues);

  const possibleSet = new Set<string>();

  for (let i = arr.length; i--; ) {
    possibleSet.add(generalConverter.stringify(arr[i] as any)!);
  }

  return {
    parse(value) {
      if (possibleSet.has(value)) {
        return generalConverter.parse(value) as ValueOf<T>;
      }

      throw getError(value, arr);
    },
    stringify(value) {
      const serializedValue = generalConverter.stringify(
        value as Generalize<ValueOf<T>>
      );

      if (possibleSet.has(serializedValue!)) {
        return serializedValue;
      }

      throw getError(value, arr);
    },
  };
};

export default createOneOfConverter;
