import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  template: `
    <div
      class="rounded-lg border border-gray-200 bg-white/20 shadow-md backdrop-blur-md"
    >
      <ng-content select="card-image"></ng-content>

      <div class="p-5">
        <h5
          class="mb-6 truncate text-xl font-bold tracking-tight text-white md:text-2xl"
        >
          <ng-content select="card-title"></ng-content>
        </h5>

        <div class="flex items-center justify-between">
          <ng-content></ng-content>
        </div>
      </div>
    </div>
  `,
})
export class CardComponent {}
