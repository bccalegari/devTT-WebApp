/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { Response } from '../../../../core/domain/response.interface';
import { Token } from '../../../../core/domain/token.interface';
import { Mapper } from '../mapper.interface';

@Injectable({
  providedIn: 'root',
})
export class ResponseTokenMapper implements Mapper<any, Response<Token>> {
  public map(response: any): Response<Token> {
    return {
      data: {
        token: response.bearerToken,
      },
      message: response.message,
    };
  }
}
