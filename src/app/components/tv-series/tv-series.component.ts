import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { DiscoverPageContent } from '../../models/response';
import { Movie } from '../../models/movie';
import { MoviesService } from '../../services/movies.service';
import { AsyncPipe } from '@angular/common';
import { SkeletonCardComponent } from '../skeleton/skeleton-card/skeleton-card.component';
import { TvSeriesListComponent } from './tv-series-list/tv-series-list.component';

@Component({
  selector: 'app-tv-series',
  standalone: true,
  imports: [AsyncPipe, SkeletonCardComponent, TvSeriesListComponent],
  templateUrl: './tv-series.component.html',
  styleUrl: './tv-series.component.css',
})
export class TvSeriesComponent {
  response$!: Observable<DiscoverPageContent<Movie>>;

  moviesService = inject(MoviesService);

  ngOnInit(): void {
    this.response$ = this.moviesService.loadTvSeries();
  }
}
