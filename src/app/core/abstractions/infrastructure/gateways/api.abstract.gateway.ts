/* eslint-disable @typescript-eslint/no-explicit-any */
import { Observable } from 'rxjs';

export abstract class AbstractApiGateway<T> {
  protected abstract get(url: string, options: object): Observable<T>;
  protected abstract post(url: string, body: any): Observable<T>;
  protected abstract put(url: string, body: any): Observable<T>;
  protected abstract delete(url: string): Observable<T>;
}
