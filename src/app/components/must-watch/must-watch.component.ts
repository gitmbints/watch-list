import { Component, inject } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';
import { DiscoverPageContent } from '../../models/response';
import { Movie, TvSerie } from '../../models/movie';
import { MoviesService } from '../../services/movies.service';
import { AsyncPipe } from '@angular/common';
import { SkeletonCardComponent } from '../skeleton/skeleton-card/skeleton-card.component';
import { MustWatchListComponent } from './must-watch-list/must-watch-list.component';

@Component({
  selector: 'app-must-watch',
  standalone: true,
  imports: [AsyncPipe, SkeletonCardComponent, MustWatchListComponent],
  templateUrl: './must-watch.component.html',
  styleUrl: './must-watch.component.css',
})
export class MustWatchComponent {
  responseMovie$!: Observable<DiscoverPageContent<Movie>>;
  responseTvSeries$!: Observable<DiscoverPageContent<TvSerie>>;
  combinedResponse$!: Observable<{
    movies: Movie[];
    tvSeries: TvSerie[];
  }>;

  moviesService = inject(MoviesService);

  ngOnInit(): void {
    this.responseMovie$ = this.moviesService.loadWatchListOfMovies();
    this.responseTvSeries$ = this.moviesService.loadWatchListOfTvSeries();

    this.combinedResponse$ = combineLatest([
      this.responseMovie$,
      this.responseTvSeries$,
    ]).pipe(
      map(([movies, tvSeries]) => ({
        movies: movies.results,
        tvSeries: tvSeries.results,
      })),
    );
  }
}
