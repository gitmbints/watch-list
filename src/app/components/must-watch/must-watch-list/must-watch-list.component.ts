import { Component, input } from '@angular/core';
import { Movie, TvSerie } from '../../../models/movie';
import { CardComponent } from '../../shared/card/card.component';
import { MustWatchItemComponent } from './must-watch-item/must-watch-item.component';

@Component({
  selector: 'app-must-watch-list',
  standalone: true,
  imports: [MustWatchItemComponent],
  templateUrl: './must-watch-list.component.html',
  styleUrl: './must-watch-list.component.css',
})
export class MustWatchListComponent {
  movies = input<Movie[]>();
  tvSeries = input<TvSerie[]>();
}
