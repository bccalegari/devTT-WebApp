export interface CompanyService<T> {
  getAll(params?: {name?: string, cnpj?: string, page?: number, size?: number}): T;
}
