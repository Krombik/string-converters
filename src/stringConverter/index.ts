import identity from "lodash.identity";
import { Converter } from "../types";

/**
 * Converter for string values.
 */
const stringConverter: Converter<string> = {
  parse: identity,
  stringify: identity,
};

export default stringConverter;
