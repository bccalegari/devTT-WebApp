export class Page<T> {
  public data: T[] = [];
  public totalRecords!: number;

  public constructor(data: T[], totalRecords: number) {
    this.data = data;
    this.totalRecords = totalRecords;
  }
}
