export class CompanyUpdateRequestDto {
  public id!: number;
  public name!: string;
  public cnpj!: string;

  public constructor(id: number, name: string, cnpj: string) {
    this.id = id;
    this.name = name;
    this.cnpj = cnpj;
  }
}
