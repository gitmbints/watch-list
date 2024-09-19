import { Component, inject, input } from '@angular/core';
import { ConfigurationService } from '../../../../services/configuration.service';
import { Movie } from '../../../../models/movie';
import { Config } from '../../../../models/config';
import { RouterLink } from '@angular/router';
import { MoviesService } from '../../../../services/movies.service';

@Component({
  selector: 'app-tv-serie-item',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './tv-serie-item.component.html',
  styleUrl: './tv-serie-item.component.css'
})
export class TvSerieItemComponent {
  configService = inject(ConfigurationService);
  moviesService = inject(MoviesService);

  tvSerie = input.required<Movie>();
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
      next: (obj) => {
        console.log(obj);
      },
    });
  }
}
