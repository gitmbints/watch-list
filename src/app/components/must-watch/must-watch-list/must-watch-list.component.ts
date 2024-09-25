import { Component, inject, input, OnInit } from '@angular/core';
import { Movie, TvSerie } from '../../../models/movie';
import { MustWatchItemComponent } from './must-watch-item/must-watch-item.component';
import { MoviesService } from '../../../services/movies.service';
import { TOAST_STATE, ToastService } from '../../../services/toast.service';
import { Response } from '../../../models/response';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-must-watch-list',
  standalone: true,
  imports: [MustWatchItemComponent],
  templateUrl: './must-watch-list.component.html',
  styleUrl: './must-watch-list.component.css',
})
export class MustWatchListComponent implements OnInit {
  moviesService: MoviesService = inject(MoviesService);
  toast: ToastService = inject(ToastService);

  movies = input<Movie[]>();
  tvSeries = input<TvSerie[]>();

  moviesState: Movie[] | undefined;
  tvSeriesState: TvSerie[] | undefined;

  ngOnInit(): void {
    this.moviesState = this.movies();
    this.tvSeriesState = this.tvSeries();
  }

  handleDelete(id: number): void {
    const isMovie = this.moviesState?.some((item) => item.id === id);
    const deleteMethod = isMovie
      ? this.deleteMovie(id)
      : this.deleteTvSeries(id);

    deleteMethod.subscribe({
      next: (response: Response) => {
        if (response.success) {
          if (isMovie) {
            this.moviesState = this.moviesState?.filter(
              (item) => item.id !== id,
            );
          } else {
            this.tvSeriesState = this.tvSeriesState?.filter(
              (item) => item.id !== id,
            );
          }
          this.toast.showToast(TOAST_STATE.success, response.status_message);
        } else {
          this.toast.showToast(TOAST_STATE.danger, response.status_message);
        }
        this.toast.dismissToastAfterDelay();
      },
      error: (err) => {
        this.toast.showToast(
          TOAST_STATE.danger,
          err.message || 'An error occurred',
        );
      },
    });
  }

  private deleteMovie(id: number): Observable<Response> {
    return this.moviesService.deleteMovieFromWatchList(id);
  }

  private deleteTvSeries(id: number): Observable<Response> {
    return this.moviesService.deleteTvSerieFromWatchList(id);
  }
}
