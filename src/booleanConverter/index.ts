import { Converter } from "../types";

/**
 * Converter for boolean values.
 */
const booleanConverter: Converter<boolean> = {
  parse(value) {
    return value === "true";
  },
  stringify: String,
};

export default booleanConverter;
