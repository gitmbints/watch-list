import { HttpClient } from '@angular/common/http';
import { inject, Injectable, OnInit } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { Config } from '../models/config';

@Injectable({
  providedIn: 'root',
})
export class ConfigurationService {
  private _BASE_URL = environment.tmdb.baseUrl;

  http = inject(HttpClient);

  getConfig(): Observable<Config> {
    return this.http
      .get<Config>(`${this._BASE_URL}/configuration`)
      .pipe(catchError((error) => this.handleError(error, undefined)));
  }

  /* Error handling */

  private handleError(error: Error, errorValue: any) {
    console.error(error);
    return of(errorValue);
  }
}
