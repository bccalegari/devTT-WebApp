import { CompanyGetResponseDto } from './company-get-response.dto';

export class CompanyGetAllResponseDto {
  readonly currentPage!: number;
  readonly size!: number;
  readonly totalElements!: number;
  readonly totalPages!: number;
  readonly companies!: CompanyGetResponseDto[];
}
