export interface HeaderItemsService<T> {
  get(role: string): T;
}
