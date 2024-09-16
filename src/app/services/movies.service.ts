import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { DiscoverPageContent } from '../models/response';
import { Observable } from 'rxjs';
import { Movie } from '../models/movie';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private _BASE_URL = environment.tmdb.baseUrl;
  private _API_KEY = environment.tmdb.apiKey;
  private http = inject(HttpClient);

  loadMovies(): Observable<DiscoverPageContent<Movie>> {
    return this.http.get<DiscoverPageContent<Movie>>(
      `${this._BASE_URL}/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc'`,
      {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${this._API_KEY}`,
        },
      },
    );
  }
}
