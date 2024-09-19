import { Component, input } from '@angular/core';
import { Movie } from '../../../models/movie';
import { CardComponent } from '../../shared/card/card.component';
import { TvSerieItemComponent } from './tv-serie-item/tv-serie-item.component';

@Component({
  selector: 'app-tv-series-list',
  standalone: true,
  imports: [TvSerieItemComponent],
  templateUrl: './tv-series-list.component.html',
  styleUrl: './tv-series-list.component.css',
})
export class TvSeriesListComponent {
  tvSeries = input<Movie[]>();
}
