import { Routes } from '@angular/router';
import { MustWatchComponent } from './components/must-watch/must-watch.component';
import { MoviesComponent } from './components/movies/movies.component';
import { TvSeriesComponent } from './components/tv-series/tv-series.component';

export const routes: Routes = [
  {
    path: 'must-watch',
    component: MustWatchComponent,
  },
  {
    path: 'movies',
    component: MoviesComponent,
  },
  {
    path: 'tv-series',
    component: TvSeriesComponent,
  },
  {
    path: '',
    redirectTo: '/must-watch',
    pathMatch: 'full',
  },
];
