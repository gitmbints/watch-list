import { Component, inject, OnInit } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
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
  route: Router = inject(Router);
  isLoggedIn: boolean = false;

  ngOnInit(): void {
    initFlowbite();
    this.authService.getAuthStatus().subscribe({
      next: (status) => {
        this.isLoggedIn = status;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  logout(): void {
    this.authService.logout();
    this.route.navigate(['/login']);
  }
}
