export type Converter<T> = {
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
