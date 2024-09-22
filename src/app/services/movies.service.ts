import { HttpClient, HttpHeaders } from '@angular/common/http';
import { createComponent, inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { DiscoverPageContent } from '../models/response';
import { catchError, Observable, of } from 'rxjs';
import { Movie, TvSerie } from '../models/movie';

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


  /* Movie services */

  loadMovies(): Observable<DiscoverPageContent<Movie>> {
    return this.http.get<DiscoverPageContent<Movie>>(
      `${this._BASE_URL}/trending/movie/day?language=en-US`,
      {
        headers: this.headers,
      },
    ).pipe(
      catchError((error) => this.handleError(error, []))
    );
  }

  getMovie(id: number): Observable<Movie | undefined> {
    return this.http.get<Movie>(
      `${this._BASE_URL}/movie/${id}?language=en-US`,
      {
        headers: this.headers,
      },
    ).pipe(
      catchError((error) => this.handleError(error, undefined))
    );
  }

  loadWatchListOfMovies(): Observable<DiscoverPageContent<Movie>> {
    return this.http.get<DiscoverPageContent<Movie>>(
      `${this._BASE_URL}/account/9391691/watchlist/movies?language=en-US&page=1&sort_by=created_at.asc'`,
      {
        headers: this.headers,
      },
    ).pipe(
      catchError((error) => this.handleError(error, []))
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
    ).pipe(
      catchError((error) => this.handleError(error, null))
    );
  }

  /* Tv Serie services */

  loadTvSeries(): Observable<DiscoverPageContent<TvSerie>> {
    return this.http.get<DiscoverPageContent<TvSerie>>(
      `${this._BASE_URL}/trending/tv/day?language=en-US`,
      {
        headers: this.headers,
      },
    ).pipe(
      catchError((error) => this.handleError(error, []))
    );
  }

  getTvSerie(id: number): Observable<TvSerie | undefined> {
    return this.http.get<TvSerie>(`${this._BASE_URL}/tv/${id}?language=en-US`, {
      headers: this.headers,
    }).pipe(
      catchError((error) => this.handleError(error, undefined))
    );
  }

  loadWatchListOfTvSeries(): Observable<DiscoverPageContent<TvSerie>> {
    return this.http.get<DiscoverPageContent<TvSerie>>(
      `${this._BASE_URL}/account/9391691/watchlist/tv?language=en-US&page=1&sort_by=created_at.asc'`,
      {
        headers: this.headers,
      },
    ).pipe(
      catchError((error) => this.handleError(error, []))
    );
  }

  addTvSerieToWatchList(id: number): Observable<Object> {
    const body = {
      media_type: 'tv',
      media_id: id,
      watchlist: true,
    };

    return this.http.post<Object>(
      `${this._BASE_URL}/account/9391691/watchlist`,
      body,
      { headers: this.headers },
    ).pipe(
      catchError((error) => this.handleError(error, null))
    );
  }

  /* Error handling */

  private handleError(error: Error, errorValue: any) {
    console.error(error);
    return of(errorValue);
  }
}
