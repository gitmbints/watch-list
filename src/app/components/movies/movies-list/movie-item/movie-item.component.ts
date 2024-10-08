import { Component, inject, input, OnInit } from '@angular/core';
import { MoviesService } from '../../../../services/movies.service';
import { ConfigurationService } from '../../../../services/configuration.service';
import { Movie } from '../../../../models/movie';
import { Config } from '../../../../models/config';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CardComponent } from '../../../shared/card/card.component';
import { TOAST_STATE, ToastService } from '../../../../services/toast.service';
import { Response } from '../../../../models/response';

@Component({
  selector: 'app-movie-item',
  standalone: true,
  imports: [AsyncPipe, RouterLink, CardComponent],
  templateUrl: './movie-item.component.html',
  styleUrl: './movie-item.component.css',
})
export class MovieItemComponent implements OnInit {
  moviesService: MoviesService = inject(MoviesService);
  configService: ConfigurationService = inject(ConfigurationService);
  toast: ToastService = inject(ToastService);

  movie = input.required<Movie>();
  config!: Config;
  imgBaseUrl: string = '';

  ngOnInit(): void {
    this.configService.getConfig().subscribe({
      next: (config) => {
        this.config = config;
        this.imgBaseUrl =
          this.config.images.base_url + this.config.images.poster_sizes[3];
      },
    });
  }

  addToWatchList(id: number) {
    this.moviesService.addMovieToWatchList(id).subscribe({
      next: (response: Response) => {
        if (response.success) {
          this.toast.showToast(TOAST_STATE.success, response.status_message);
          this.toast.dismissToastAfterDelay();
        }
      },
      error: (err) => {
        this.toast.showToast(TOAST_STATE.danger, err);
      },
    });
  }
}
