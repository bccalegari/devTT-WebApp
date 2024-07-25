/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Observable, takeUntil } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AbstractApiGateway } from '../../core/abstractions/infrastructure/gateways/api.abstract.gateway';
import { ObservableUnsubscriberHook } from '../http/hooks/observable-unsubscriber-hook';

export abstract class DevTtAbstractApiGateway<T> extends AbstractApiGateway<T> {
  protected readonly _apiBaseUrl: string = environment.apiBaseUrl;
  private readonly _internalHttp: HttpClient;
  private readonly _internalUnsubscriberHook$: ObservableUnsubscriberHook;

  protected constructor(http: HttpClient, unsubscriberHook$: ObservableUnsubscriberHook) {
    super();
    this._internalHttp = http;
    this._internalUnsubscriberHook$ = unsubscriberHook$;
  }

  protected override get(url: string): Observable<T> {
    return this._internalHttp
      .get<T>(this._apiBaseUrl.concat(url))
      .pipe(takeUntil(this._internalUnsubscriberHook$.destroy$));
  }

  protected override post(url: string, body: any): Observable<T> {
    return this._internalHttp
      .post<T>(this._apiBaseUrl.concat(url), body)
      .pipe(takeUntil(this._internalUnsubscriberHook$.destroy$));
  }

  protected override put(url: string, body: any): Observable<T> {
    return this._internalHttp
      .put<T>(this._apiBaseUrl.concat(url), body)
      .pipe(takeUntil(this._internalUnsubscriberHook$.destroy$));
  }

  protected override delete(url: string): Observable<T> {
    return this._internalHttp
      .delete<T>(this._apiBaseUrl.concat(url))
      .pipe(takeUntil(this._internalUnsubscriberHook$.destroy$));
  }
}
