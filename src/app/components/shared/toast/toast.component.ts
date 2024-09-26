import { Component, inject } from '@angular/core';
import { ToastService } from '../../../services/toast.service';
import { AsyncPipe } from '@angular/common';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css',
  animations: [
    trigger('showToast', [
      state(
        'open',
        style({
          opacity: 1,
          transform: 'translateY(0)',
        }),
      ),
      state(
        'close',
        style({
          opacity: 0,
          transform: 'translateY(100%)',
        }),
      ),
      transition('open <=> close', [animate('200ms ease-in-out')]),
    ]),
  ],
})
export class ToastComponent {
  toast: ToastService = inject(ToastService);

  constructor() {}

  ngOnInit(): void {}

  dismiss(): void {
    this.toast.dismissToast();
  }
}
