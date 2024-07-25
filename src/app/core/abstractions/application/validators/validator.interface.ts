export interface Validator<I> {
  validate(input: I): boolean;
}
