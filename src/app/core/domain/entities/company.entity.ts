export class Company {
  public readonly id!: number;
  public readonly name!: string;
  public readonly cnpj!: string;

  public constructor(id: number, name: string, cnpj: string) {
    this.id = id;
    this.name = name;

    if (cnpj.length !== 14) {
      throw new Error('CNPJ must have 14 characters');
    }

    this.cnpj = cnpj;
  }
}
