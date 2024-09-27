import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { ToastComponent } from './components/shared/toast/toast.component';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, ToastComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  authService: AuthService = inject(AuthService);

  ngOnInit(): void {
    initFlowbite();
  }

  logout(): void {
    this.authService.logout();
    console.log('isLoggedIn: ', this.authService.isLoggedIn)
  }
}
