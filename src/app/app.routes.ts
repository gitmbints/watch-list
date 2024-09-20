import { Routes } from '@angular/router';
import { MustWatchComponent } from './components/must-watch/must-watch.component';
import { MoviesComponent } from './components/movies/movies.component';
import { TvSeriesComponent } from './components/tv-series/tv-series.component';
import { MovieDetailComponent } from './components/movies/movie-detail/movie-detail.component';
import { TvSerieDetailComponent } from './components/tv-series/tv-serie-detail/tv-serie-detail.component';

export const routes: Routes = [
  {
    path: 'to-watch',
    component: MustWatchComponent,
  },
  {
    path: 'movies',
    component: MoviesComponent,
  },
  {
    path: 'movie/:id',
    component: MovieDetailComponent,
  },
  {
    path: 'tv-series',
    component: TvSeriesComponent,
  },
  {
    path: 'tv-serie/:id',
    component: TvSerieDetailComponent,
  },
  {
    path: '',
    redirectTo: '/to-watch',
    pathMatch: 'full',
  },
];
