import { Component, inject, input, OnInit } from '@angular/core';
import { AsyncPipe, DatePipe } from '@angular/common';
import { Movie } from '../../../models/movie';
import { MoviesService } from '../../../services/movies.service';
import { ConfigurationService } from '../../../services/configuration.service';
import { Config } from '../../../models/config';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [AsyncPipe, DatePipe],
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.css',
  host: {
    '[style.background-image]': 'backgroundImage',
  },
})
export class MovieDetailComponent implements OnInit {
  moviesService = inject(MoviesService);
  configService = inject(ConfigurationService);
  backgroundImage: string = '';

  id = input<string>();
  movie!: Movie;
  config!: Config;
  imgBaseUrl: string = '';
  isLoading: boolean = true;

  ngOnInit() {
    this.moviesService.getMovie(Number(this.id())).subscribe({
      next: (movie) => {
        this.movie = movie;
        this.updateBackgroundImage();
      },
      error: (err) => {
        console.error('Error fetching movie:', err);
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
    if (this.movie && this.config) {
      this.backgroundImage = `linear-gradient(
    to top,
    #243b55,
    #141e30
  ), url(${this.config.images.base_url + this.config.images.backdrop_sizes[3] + this.movie.backdrop_path})`;
      this.isLoading = false;
    }
  }
}
