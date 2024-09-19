import { Component, input } from '@angular/core';
import { Movie } from '../../../models/movie';
import { CardComponent } from '../../shared/card/card.component';

@Component({
  selector: 'app-must-watch-list',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './must-watch-list.component.html',
  styleUrl: './must-watch-list.component.css',
})
export class MustWatchListComponent {
  movies = input<Movie[]>();
}
