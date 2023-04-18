export interface PaginationType<D> {
  readonly limit: number
  readonly current: number
  readonly items: D[]
}

export type FilteringField<Field extends string, Option extends keyof FilteringOptions, Value = unknown> = { [x in `${Field}__${Option}`]: Value }

export interface FilteringOptions<Value = unknown> {
  not: Value
  /**
   * checks if value of field is in passed list
   */
  in: Value
  not_in: Value
  /**
   * greater or equals than passed value
   */
  gte: Value
  /**
   * greater than passed value
   */
  gt: Value
  /**
   * lower or equals than passed value
   */
  lte: Value
  /**
   * lower than passed value
   */
  lt: Value
  /**
   * between and given two values
   */
  range: Value
  /**
   * field is null
   */
  isnull: Value
  /**
   * field is not null
   */
  not_isnull: Value
  /**
   * field contains specified substring
   */
  contains: Value
  /**
   * case insensitive contains
   */
  icontains: Value
  /**
   * if field starts with value
   */
  startswith: Value
  /**
   * case insensitive startswith
   */
  istartswith: Value
  /**
   * if field ends with value
   */
  endswith: Value
  /**
   * case insensitive endswith
   */
  iendswith: Value
  /**
   * case insensitive equals
   */
  iexact: Value
}