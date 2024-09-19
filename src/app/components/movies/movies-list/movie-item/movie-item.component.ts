import { Component, inject, input, OnInit } from '@angular/core';
import { MoviesService } from '../../../../services/movies.service';
import { ConfigurationService } from '../../../../services/configuration.service';
import { Movie } from '../../../../models/movie';
import { Config } from '../../../../models/config';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CardComponent } from '../../../shared/card/card.component';

@Component({
  selector: 'app-movie-item',
  standalone: true,
  imports: [AsyncPipe, RouterLink],
  templateUrl: './movie-item.component.html',
  styleUrl: './movie-item.component.css'
})
export class MovieItemComponent implements OnInit {
  moviesService = inject(MoviesService);
  configService = inject(ConfigurationService);

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
      next: (obj) => {
        console.log(obj);
      },
    });
  }
}
