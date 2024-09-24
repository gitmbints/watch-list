import { Component, inject, input } from '@angular/core';
import { ConfigurationService } from '../../../../services/configuration.service';
import { TvSerie } from '../../../../models/movie';
import { Config } from '../../../../models/config';
import { RouterLink } from '@angular/router';
import { MoviesService } from '../../../../services/movies.service';
import { CardComponent } from '../../../shared/card/card.component';
import { TOAST_STATE, ToastService } from '../../../../services/toast.service';
import { Response } from '../../../../models/response';

@Component({
  selector: 'app-tv-serie-item',
  standalone: true,
  imports: [RouterLink, CardComponent],
  templateUrl: './tv-serie-item.component.html',
  styleUrl: './tv-serie-item.component.css',
})
export class TvSerieItemComponent {
  configService: ConfigurationService = inject(ConfigurationService);
  moviesService: MoviesService = inject(MoviesService);
  toast: ToastService = inject(ToastService);

  tvSerie = input.required<TvSerie>();
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
    this.moviesService.addTvSerieToWatchList(id).subscribe({
      next: (response: Response) => {
        if (response.success) {
          this.toast.showToast(TOAST_STATE.success, response.status_message);
          this.toast.dismissToastAfterDelay();
        }
      },
      error: (err) => {
        this.toast.showToast(TOAST_STATE.danger, err);
        this.toast.dismissToastAfterDelay();
      },
    });
  }
}
