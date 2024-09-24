import { Component, inject, input, OnInit } from '@angular/core';
import { Movie } from '../../../models/movie';
import { MovieItemComponent } from './movie-item/movie-item.component';
import { FormsModule } from '@angular/forms';
import { MoviesService } from '../../../services/movies.service';
import { AsyncPipe } from '@angular/common';
import { Observable, of } from 'rxjs';
import { DiscoverPageContent } from '../../../models/response';

@Component({
  selector: 'app-movies-list',
  standalone: true,
  imports: [MovieItemComponent, FormsModule, AsyncPipe],
  templateUrl: './movies-list.component.html',
  styleUrl: './movies-list.component.css',
})
export class MoviesListComponent {
  moviesService: MoviesService = inject(MoviesService);

  movies = input<Movie[]>();
  searchQuery: string = '';
  searchResponse$: Observable<DiscoverPageContent<Movie> | null> = of(null);

  searchMovie() {
    if (this.searchQuery) {
      this.searchResponse$ = this.moviesService.searchMovie(this.searchQuery);
    } else {
      this.searchResponse$ = of(null);
    }
  }
}
