import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  inject,
  input,
  OnInit,
  Renderer2,
} from '@angular/core';
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
})
export class MovieDetailComponent implements OnInit {
  moviesService = inject(MoviesService);
  configService = inject(ConfigurationService);
  renderer = inject(Renderer2);
  hostElement = inject(ElementRef);
  cdr = inject(ChangeDetectorRef);

  id = input<string>();
  movie!: Movie;
  config!: Config;
  imgBaseUrl: string = '';

  ngOnInit() {
    this.moviesService.getMovie(Number(this.id())).subscribe({
      next: (movie) => {
        this.movie = movie;
      },
      error: (err) => {
        console.error('Error fetching movie:', err);
      },
    });

    this.configService.getConfig().subscribe({
      next: (config) => {
        this.config = config;
        this.imgBaseUrl =
          this.config.images.base_url + this.config.images.poster_sizes[3];
        this.updateHostBackground();
      },
    });
  }

  // Update the background image on the :host element
  updateHostBackground() {
    if (this.movie) {
      const backgroundImageUrl = `linear-gradient(
    to top,
    #243b55,
    #141e30
  ), url(${this.config.images.base_url + this.config.images.backdrop_sizes[3] + this.movie.backdrop_path})`;
      this.renderer.setStyle(
        this.hostElement.nativeElement,
        'background-image',
        backgroundImageUrl,
      );
    }
    this.cdr.detectChanges();
  }
}
