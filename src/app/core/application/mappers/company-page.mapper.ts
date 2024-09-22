import { Injectable } from '@angular/core';
import { createMap, forMember, mapFrom } from '@automapper/core';
import { Mapper } from '../../abstractions/application/mappers/mapper.abstract';
import { Page } from '../../domain/valueobjects/page.valueobject';
import { Company } from '../../domain/entities/company.entity';
import { CompanyGetAllResponseDto } from '../../../infrastructure/dtos/company-get-all-response.dto';

@Injectable({
  providedIn: 'root',
})
export class CompanyPageMapper extends Mapper<CompanyGetAllResponseDto, Page<Company>> {
  public constructor() {
    super();
    this.buildMapper();
  }

  public override map(response: CompanyGetAllResponseDto): Page<Company> {
    return Mapper.INTERNAL_MAPPER.map(
      response,
      CompanyGetAllResponseDto,
      Page<Company>,
    ) as Page<Company>;
  }

  private buildMapper(): void {
    createMap<CompanyGetAllResponseDto, Page<Company>>(
      Mapper.INTERNAL_MAPPER,
      CompanyGetAllResponseDto,
      Page<Company>,
      forMember(
        d => d.data,
        mapFrom(s => s.companies),
      ),
      forMember(
        d => d.totalRecords,
        mapFrom(s => s.totalElements),
      ),
    );
  }
}
