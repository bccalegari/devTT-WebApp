/* eslint-disable @typescript-eslint/no-explicit-any */
import { Observable } from 'rxjs';

export abstract class AbstractApiGateway {
  protected abstract get<T>(url: string, options: object): Observable<T>;
  protected abstract post<T>(url: string, body: any): Observable<T>;
  protected abstract put<T>(url: string, body: any): Observable<T>;
  protected abstract delete<T>(url: string): Observable<T>;
}
