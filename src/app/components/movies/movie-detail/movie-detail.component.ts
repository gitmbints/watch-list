import { Movie } from './../../../models/movie';
import { Component, inject } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { MoviesService } from '../../../services/movies.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.css'
})
export class MovieDetailComponent {
  route = inject(ActivatedRoute);
  router = inject(Router);
  moviesService = inject(MoviesService);
  movie$!: Observable<Movie>;

  ngOnInit(): void {
    const movieId = this.route.snapshot.paramMap.get('id');
    this.movie$ = this.moviesService.getMovie(Number(movieId));
  }

}
