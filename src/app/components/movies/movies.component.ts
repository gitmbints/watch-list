import { Observable } from 'rxjs';
import { Component, inject, OnInit } from '@angular/core';
import { Movie } from '../../models/movie';
import { DiscoverPageContent } from '../../models/response';
import { MoviesService } from '../../services/movies.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css',
})
export class MoviesComponent implements OnInit {
  response$!: Observable<DiscoverPageContent<Movie>>;

  moviesService = inject(MoviesService);

  ngOnInit(): void {
    this.response$ = this.moviesService.loadMovies();
  }
}
