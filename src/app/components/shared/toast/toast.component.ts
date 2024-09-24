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
    trigger('toastTrigger', [
      state('open', style({ transform: 'translateY(0%)' })),
      state('close', style({ transform: 'translateY(100%)' })),
      transition('open <=> close', [animate('300ms 100ms ease-in-out')]),
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
