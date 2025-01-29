// services/stock.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { StockLog } from '../models/stock-log';

@Injectable({ providedIn: 'root' })
export class StockService {
  private readonly baseUrl = 'https://app.staging.aegro.io/pub/v1';
  private readonly token = 'aegro_vMvcLpFsVxW3cT+iXuuGdJ38r1CE4Xt4t9AThtp2cWs.ONLZr3mXR6ymdeSkMxGLhGsFQWNNSVdbpdhipDt4EGA9kAljFtDujot1oFT51FgQQAPLez2Ym7C+0jGgzqu9GA';

  constructor(private http: HttpClient) { }

  private get headers(): HttpHeaders {
    return new HttpHeaders({
      'Aegro-Public-API-Key': this.token,
      'Content-Type': 'application/json'
    });
  }

  private logRequest(method: string, url: string, body?: any): void {
    console.log(`HTTP ${method} request to ${url}`, body);
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  getStockLogs(filter: any): Observable<{ items: StockLog[] }> {
    const url = `${this.baseUrl}/stock-logs`;
    this.logRequest('POST', url, filter);
    return this.http.post<{ items: StockLog[] }>(url, filter, { headers: this.headers })
      .pipe(
        tap(data => console.log('Fetched stock logs:', data)),
        catchError(this.handleError)
      );
  }

  createManualEntry(payload: any): Observable<any> {
    const url = `${this.baseUrl}/stock-logs/entry`;
    this.logRequest('POST', url, payload);
    return this.http.post<any>(url, payload, { headers: this.headers })
      .pipe(
        tap(data => console.log('Created manual entry:', data)),
        catchError(this.handleError)
      );
  }

  createManualRemoval(payload: any): Observable<any> {
    const url = `${this.baseUrl}/stock-logs/removal`;
    this.logRequest('POST', url, payload);
    return this.http.post<any>(url, payload, { headers: this.headers })
      .pipe(
        tap(data => console.log('Created manual removal:', data)),
        catchError(this.handleError)
      );
  }

  getStockLogByKey(stockLogKey: string): Observable<StockLog> {
    const url = `${this.baseUrl}/stock-logs/${stockLogKey}`;
    this.logRequest('GET', url);
    return this.http.get<StockLog>(url, { headers: this.headers })
      .pipe(
        tap(data => console.log('Fetched stock log by key:', data)),
        catchError(this.handleError)
      );
  }
}