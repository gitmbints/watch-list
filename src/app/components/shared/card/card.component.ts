import { Component, inject, input, OnInit } from '@angular/core';
import { Movie } from '../../../models/movie';
import { MoviesService } from '../../../services/movies.service';
import { Config } from '../../../models/config';
import { ConfigurationService } from '../../../services/configuration.service';
import { AsyncPipe } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [AsyncPipe, RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent implements OnInit {
  movieService = inject(MoviesService);
  configService = inject(ConfigurationService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  movie = input.required<Movie>();
  config!: Config;
  imgBaseUrl: string = '';
  movieId!: number;

  ngOnInit(): void {
    this.configService.getConfig().subscribe({
      next: (config) => {
        this.config = config;
        this.imgBaseUrl =
          this.config.images.base_url + this.config.images.poster_sizes[3];
      },
    });
  }
}
