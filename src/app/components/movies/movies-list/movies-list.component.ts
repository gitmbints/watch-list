import { Component, input } from '@angular/core';
import { Movie } from '../../../models/movie';
import { CardComponent } from '../../shared/card/card.component';
import { MovieItemComponent } from './movie-item/movie-item.component';

@Component({
  selector: 'app-movies-list',
  standalone: true,
  imports: [MovieItemComponent],
  templateUrl: './movies-list.component.html',
  styleUrl: './movies-list.component.css',
})
export class MoviesListComponent {
  movies = input<Movie[]>();
}
