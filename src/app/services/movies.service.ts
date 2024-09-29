import { HttpClient, HttpHeaders } from '@angular/common/http';
import { createComponent, inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { DiscoverPageContent, Response } from '../models/response';
import { catchError, Observable, of } from 'rxjs';
import { Movie, TvSerie } from '../models/movie';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private _BASE_URL = environment.tmdb.baseUrl;

  private http = inject(HttpClient);

  loadMovies(): Observable<DiscoverPageContent<Movie>> {
    return this.http
      .get<
        DiscoverPageContent<Movie>
      >(`${this._BASE_URL}/trending/movie/day?language=en-US`)
      .pipe(catchError((error) => this.handleError(error, [])));
  }

  getMovie(id: number): Observable<Movie | undefined> {
    return this.http
      .get<Movie>(`${this._BASE_URL}/movie/${id}?language=en-US`)
      .pipe(catchError((error) => this.handleError(error, undefined)));
  }

  loadWatchListOfMovies(): Observable<DiscoverPageContent<Movie>> {
    return this.http
      .get<
        DiscoverPageContent<Movie>
      >(`${this._BASE_URL}/account/9391691/watchlist/movies?language=en-US&page=1&sort_by=created_at.asc'`)
      .pipe(catchError((error) => this.handleError(error, [])));
  }

  addMovieToWatchList(id: number): Observable<Response> {
    const body = {
      media_type: 'movie',
      media_id: id,
      watchlist: true,
    };

    return this.http
      .post<Response>(`${this._BASE_URL}/account/9391691/watchlist`, body)
      .pipe(catchError((error) => this.handleError(error, null)));
  }

  deleteMovieFromWatchList(id: number): Observable<Response> {
    const body = {
      media_type: 'movie',
      media_id: id,
      watchlist: false,
    };

    return this.http
      .post<Response>(`${this._BASE_URL}/account/9391691/watchlist`, body)
      .pipe(catchError((error) => this.handleError(error, null)));
  }

  searchMovie(title: string): Observable<DiscoverPageContent<Movie>> {
    return this.http
      .get<Movie>(
        `${this._BASE_URL}/search/movie?query=${title}&include_adult=false&language=en-US&page=1`,
      )
      .pipe(catchError((error) => this.handleError(error, [])));
  }

  /* Tv Serie services */

  loadTvSeries(): Observable<DiscoverPageContent<TvSerie>> {
    return this.http
      .get<
        DiscoverPageContent<TvSerie>
      >(`${this._BASE_URL}/trending/tv/day?language=en-US`)
      .pipe(catchError((error) => this.handleError(error, [])));
  }

  getTvSerie(id: number): Observable<TvSerie | undefined> {
    return this.http
      .get<TvSerie>(`${this._BASE_URL}/tv/${id}?language=en-US`)
      .pipe(catchError((error) => this.handleError(error, undefined)));
  }

  loadWatchListOfTvSeries(): Observable<DiscoverPageContent<TvSerie>> {
    return this.http
      .get<
        DiscoverPageContent<TvSerie>
      >(`${this._BASE_URL}/account/9391691/watchlist/tv?language=en-US&page=1&sort_by=created_at.asc'`)
      .pipe(catchError((error) => this.handleError(error, [])));
  }

  addTvSerieToWatchList(id: number): Observable<Response> {
    const body = {
      media_type: 'tv',
      media_id: id,
      watchlist: true,
    };

    return this.http
      .post<Response>(`${this._BASE_URL}/account/9391691/watchlist`, body)
      .pipe(catchError((error) => this.handleError(error, null)));
  }

  deleteTvSerieFromWatchList(id: number): Observable<Response> {
    const body = {
      media_type: 'tv',
      media_id: id,
      watchlist: false,
    };

    return this.http
      .post<Response>(`${this._BASE_URL}/account/9391691/watchlist`, body)
      .pipe(catchError((error) => this.handleError(error, null)));
  }

  searchTvSerie(title: string): Observable<DiscoverPageContent<TvSerie>> {
    return this.http
      .get<TvSerie>(
        `${this._BASE_URL}/search/tv?query=${title}&include_adult=false&language=en-US&page=1`,
      )
      .pipe(catchError((error) => this.handleError(error, [])));
  }

  /* Error handling */

  private handleError(error: Error, errorValue: any) {
    console.error(error);
    return of(errorValue);
  }
}
