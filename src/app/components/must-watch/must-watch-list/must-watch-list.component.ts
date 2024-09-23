import { Component, inject, input } from '@angular/core';
import { Movie, TvSerie } from '../../../models/movie';
import { MustWatchItemComponent } from './must-watch-item/must-watch-item.component';
import { MoviesService } from '../../../services/movies.service';

@Component({
  selector: 'app-must-watch-list',
  standalone: true,
  imports: [MustWatchItemComponent],
  templateUrl: './must-watch-list.component.html',
  styleUrl: './must-watch-list.component.css',
})
export class MustWatchListComponent {
  moviesService = inject(MoviesService);

  movies = input<Movie[]>();
  tvSeries = input<TvSerie[]>();

  handleDelete(id: number) {
    const itemToDelete =
      this.movies()?.find((item) => item.id === id) ||
      this.tvSeries()?.find((item) => item.id === id);

    if (itemToDelete) {
      const deleteMethod = this.movies()?.some((item) => item === itemToDelete)
        ? this.moviesService.deleteMovieFromWatchList(id)
        : this.moviesService.deleteTvSerieFromWatchList(id);

      deleteMethod.subscribe({
        next: (obj) => {
          console.log(obj);
        },
        error: (err) => {
          console.error('Error on calling delete api: ', err);
        },
      });
    }
  }
}
