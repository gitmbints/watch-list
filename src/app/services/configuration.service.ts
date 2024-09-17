import { HttpClient } from '@angular/common/http';
import { inject, Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Config } from '../models/config';

@Injectable({
  providedIn: 'root',
})
export class ConfigurationService {
  private _BASE_URL = environment.tmdb.baseUrl;
  private _API_KEY = environment.tmdb.apiKey;

  http = inject(HttpClient);

  getConfig(): Observable<Config> {
    return this.http.get<Config>(`${this._BASE_URL}/configuration`, {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${this._API_KEY}`,
      },
    });
  }
}
