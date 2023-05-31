import { Converter } from "../types";

/**
 * Converter for numeric values.
 */
const numberConverter: Converter<number> = {
  parse(value) {
    const _value = +value;

    if (isNaN(_value)) {
      throw new Error("NaN");
    }

    return _value;
  },
  stringify: String,
};

export default numberConverter;
