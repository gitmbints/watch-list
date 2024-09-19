import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  private headers = new HttpHeaders({
    accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${this._API_KEY}`,
  });

  loadMovies(): Observable<DiscoverPageContent<Movie>> {
    return this.http.get<DiscoverPageContent<Movie>>(
      `${this._BASE_URL}/trending/movie/day?language=en-US`,
      {
        headers: this.headers,
      },
    );
  }

  getMovie(id: number): Observable<Movie> {
    return this.http.get<Movie>(
      `${this._BASE_URL}/movie/${id}?language=en-US`,
      {
        headers: this.headers,
      },
    );
  }

  loadWatchList(): Observable<DiscoverPageContent<Movie>> {
    return this.http.get<DiscoverPageContent<Movie>>(
      `${this._BASE_URL}/account/9391691/watchlist/movies?language=en-US&page=1&sort_by=created_at.asc'`,
      {
        headers: this.headers,
      },
    );
  }

  addMovieToWatchList(id: number): Observable<Object> {
    const body = {
      media_type: 'movie',
      media_id: id,
      watchlist: true,
    };

    return this.http.post<Object>(
      `${this._BASE_URL}/account/9391691/watchlist`,
      body,
      { headers: this.headers },
    );
  }

  loadTvSeries(): Observable<DiscoverPageContent<Movie>> {
    return this.http.get<DiscoverPageContent<Movie>>(
      `${this._BASE_URL}/trending/tv/day?language=en-US`,
      {
        headers: this.headers,
      },
    );
  }
}
