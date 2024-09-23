import { Component, inject, input } from '@angular/core';
import { TvSerie } from '../../../models/movie';
import { TvSerieItemComponent } from './tv-serie-item/tv-serie-item.component';
import { MoviesService } from '../../../services/movies.service';
import { Observable, of } from 'rxjs';
import { DiscoverPageContent } from '../../../models/response';
import { FormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-tv-series-list',
  standalone: true,
  imports: [TvSerieItemComponent, FormsModule, AsyncPipe],
  templateUrl: './tv-series-list.component.html',
  styleUrl: './tv-series-list.component.css',
})
export class TvSeriesListComponent {
  moviesService = inject(MoviesService);

  tvSeries = input<TvSerie[]>();
  searchQuery: string = '';
  searchResponse$: Observable<DiscoverPageContent<TvSerie> | null> = of(null);

  searchTvSerie() {
    if (this.searchQuery) {
      this.searchResponse$ = this.moviesService.searchTvSerie(this.searchQuery);
    } else {
      this.searchResponse$ = of(null);
    }
  }
}
