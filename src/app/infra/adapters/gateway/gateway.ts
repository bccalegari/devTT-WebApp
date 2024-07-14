/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, takeUntil } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ApiErrorFactory } from '../../error/api-error.factory';
import { ObservableUnsubscriberHook } from '../../http/hooks/observable-unsubscriber-hook';

export abstract class GenericGateway<T> {
  protected readonly _apiBaseUrl: string = environment.apiBaseUrl;
  private readonly _internalHttp: HttpClient;
  private readonly _internalUnsubscriberHook$: ObservableUnsubscriberHook;

  protected constructor(http: HttpClient, unsubscriberHook$: ObservableUnsubscriberHook) {
    this._internalHttp = http;
    this._internalUnsubscriberHook$ = unsubscriberHook$;
  }

  protected get(url: string): Observable<T> {
    return this._internalHttp
      .get<T>(this._apiBaseUrl.concat(url))
      .pipe(takeUntil(this._internalUnsubscriberHook$.destroy$), catchError(this.handleError));
  }

  protected post(url: string, body: any): Observable<T> {
    return this._internalHttp
      .post<T>(this._apiBaseUrl.concat(url), body)
      .pipe(takeUntil(this._internalUnsubscriberHook$.destroy$), catchError(this.handleError));
  }

  protected put(url: string, body: any): Observable<T> {
    return this._internalHttp
      .put<T>(this._apiBaseUrl.concat(url), body)
      .pipe(takeUntil(this._internalUnsubscriberHook$.destroy$), catchError(this.handleError));
  }

  protected delete(url: string): Observable<T> {
    return this._internalHttp
      .delete<T>(this._apiBaseUrl.concat(url))
      .pipe(takeUntil(this._internalUnsubscriberHook$.destroy$), catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    throw ApiErrorFactory.createApiError(error);
  }
}
