import { Component, inject } from '@angular/core';
import { ToastService } from '../../../services/toast.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css',
})
export class ToastComponent {
  toastState!: string[];
  toastMessage!: string;
  showsToast!: boolean;

  toast: ToastService = inject(ToastService);

  constructor() {}

  ngOnInit(): void {}

  dismiss(): void {
    this.toast.dismissToast();
  }
}
