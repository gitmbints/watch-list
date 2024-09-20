import { Component, inject, input } from '@angular/core';
import { MoviesService } from '../../../services/movies.service';
import { ConfigurationService } from '../../../services/configuration.service';
import { TvSerie } from '../../../models/movie';
import { Config } from '../../../models/config';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-tv-serie-detail',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './tv-serie-detail.component.html',
  styleUrl: './tv-serie-detail.component.css',
  host: {
    '[style.background-image]': 'backgroundImage',
  },
})
export class TvSerieDetailComponent {
  moviesService = inject(MoviesService);
  configService = inject(ConfigurationService);
  backgroundImage: string = '';

  id = input<string>();
  tvSerie!: TvSerie;
  config!: Config;
  imgBaseUrl: string = '';
  isLoading: boolean = true;

  ngOnInit() {
    this.moviesService.getTvSerie(Number(this.id())).subscribe({
      next: (tvSerie) => {
        this.tvSerie = tvSerie;
        this.updateBackgroundImage();
      },
      error: (err) => {
        console.error('Error fetching tvSerie:', err);
        this.isLoading = false;
      },
    });

    this.configService.getConfig().subscribe({
      next: (config) => {
        this.config = config;
        this.imgBaseUrl =
          this.config.images.base_url + this.config.images.poster_sizes[3];

        this.updateBackgroundImage();
      },
      error: (err) => {
        console.error('Error fetching config:', err);
        this.isLoading = false;
      },
    });
  }

  updateBackgroundImage() {
    if (this.tvSerie && this.config) {
      this.backgroundImage = `linear-gradient(
    to top,
    #243b55,
    #141e30
  ), url(${this.config.images.base_url + this.config.images.backdrop_sizes[3] + this.tvSerie.backdrop_path})`;
      this.isLoading = false;
    }
  }
}
