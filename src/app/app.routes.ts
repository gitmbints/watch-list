import { Routes } from '@angular/router';
import { MustWatchComponent } from './components/must-watch/must-watch.component';
import { MoviesComponent } from './components/movies/movies.component';
import { TvSeriesComponent } from './components/tv-series/tv-series.component';
import { MovieDetailComponent } from './components/movies/movie-detail/movie-detail.component';
import { TvSerieDetailComponent } from './components/tv-series/tv-serie-detail/tv-serie-detail.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'to-watch',
    component: MustWatchComponent,
    canActivate: [authGuard],
  },
  {
    path: 'movies',
    component: MoviesComponent,
    canActivate: [authGuard],
  },
  {
    path: 'movie/:id',
    component: MovieDetailComponent,
    canActivate: [authGuard],
  },
  {
    path: 'tv-series',
    component: TvSeriesComponent,
    canActivate: [authGuard],
  },
  {
    path: 'tv-serie/:id',
    component: TvSerieDetailComponent,
    canActivate: [authGuard],
  },
];
