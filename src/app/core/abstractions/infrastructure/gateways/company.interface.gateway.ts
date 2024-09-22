export interface CompanyGateway<T> {
  getAll(name: string, cnpj: string, page: number, size: number): T;
}
