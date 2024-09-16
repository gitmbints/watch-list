import { Component, inject, OnInit } from '@angular/core';
import { Movie } from '../../models/movie';
import { DiscoverPageContent } from '../../models/response';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css',
})
export class MoviesComponent implements OnInit {
  response!: DiscoverPageContent<Movie>;
  movies!: Movie[];

  moviesService = inject(MoviesService);

  ngOnInit(): void {
    this.moviesService.loadMovies().subscribe({
      next: (response) => {
        this.response = response;
        this.movies = this.response.results;
      },
    });
  }
}
