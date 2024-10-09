export class CompanyCreateRequestDtoDto {
  public name!: string;
  public cnpj!: string;

  public constructor(name: string, cnpj: string) {
    this.name = name;
    this.cnpj = cnpj;
  }
}
