import { Converter } from "../types";

/**
 * Creates a converter for arrays using the specified item converter and separator.
 *
 * @template T - The type of items in the array.
 * @param {Converter<T>} itemConverter - The converter for individual items in the array.
 * @param {string} [separator=','] - The separator used to split and join the array values.
 * @returns {Converter<T[]>} The converter for arrays.
 */
const createArrayConverter = <T>(
  itemConverter: Converter<T>,
  separator: string = ","
): Converter<T[]> => ({
  parse(value) {
    return value.split(separator).map(itemConverter.parse) as T[];
  },
  stringify(value) {
    return value.map(itemConverter.stringify).join(separator);
  },
});

export default createArrayConverter;
