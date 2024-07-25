import { HttpInterceptorFn } from '@angular/common/http';
import { catchError } from 'rxjs';
import { ApiErrorFactory } from '../../error/api-error.factory';

export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error) => {
      console.log(error)
      throw ApiErrorFactory.createApiError(error);
    }),
  );
};
