import { Component, inject, input, output } from '@angular/core';
import { ConfigurationService } from '../../../../services/configuration.service';
import { Movie, TvSerie } from '../../../../models/movie';
import { Config } from '../../../../models/config';
import { RouterLink } from '@angular/router';
import { CardComponent } from '../../../shared/card/card.component';

@Component({
  selector: 'app-must-watch-item',
  standalone: true,
  imports: [RouterLink, CardComponent],
  templateUrl: './must-watch-item.component.html',
  styleUrl: './must-watch-item.component.css',
})
export class MustWatchItemComponent {
  configService = inject(ConfigurationService);

  movie = input<Movie>();
  tvSerie = input<TvSerie>();
  config!: Config;
  imgBaseUrl: string = '';
  onRemoveItem = output<number>();

  ngOnInit(): void {
    this.configService.getConfig().subscribe({
      next: (config) => {
        this.config = config;
        this.imgBaseUrl =
          this.config.images.base_url + this.config.images.poster_sizes[3];
      },
    });
  }

  removeItem(id: number) {
    this.onRemoveItem.emit(id);
  }
}
