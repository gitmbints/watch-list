import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { DiscoverPageContent } from '../../models/response';
import { Movie } from '../../models/movie';
import { MoviesService } from '../../services/movies.service';
import { AsyncPipe } from '@angular/common';
import { SkeletonCardComponent } from '../skeleton/skeleton-card/skeleton-card.component';
import { MustWatchListComponent } from './must-watch-list/must-watch-list.component';

@Component({
  selector: 'app-must-watch',
  standalone: true,
  imports: [AsyncPipe, SkeletonCardComponent, MustWatchListComponent],
  templateUrl: './must-watch.component.html',
  styleUrl: './must-watch.component.css',
})
export class MustWatchComponent {
  response$!: Observable<DiscoverPageContent<Movie>>;

  moviesService = inject(MoviesService);

  ngOnInit(): void {
    this.response$ = this.moviesService.loadWatchList();
  }
}
