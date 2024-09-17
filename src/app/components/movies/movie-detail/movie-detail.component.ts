import { Component, inject } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [],
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.css'
})
export class MovieDetailComponent {
  route = inject(ActivatedRoute);
  router = inject(Router);

  ngOnInit(): void {
    const movieId = this.route.snapshot.paramMap.get('id');

    // request to a particular movie
  }


}
