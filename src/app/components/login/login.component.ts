import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  hasError: boolean = false;
  private request_token: string = '';

  authService: AuthService = inject(AuthService);
  router: Router = inject(Router);

  onLogin(): void {
    this.authService.getRequestToken().subscribe({
      next: (response) => {
        this.request_token = response.request_token;

        this.authService
          .validateWithLogin(this.username, this.password, this.request_token)
          .subscribe({
            next: (response) => {
              if (response.success) {
                this.authService.createSession(this.request_token).subscribe({
                  next: (response) => {
                    this.authService.setSession(response.session_id);
                    console.log('Session établie');
                    this.router.navigate(['/to-watch']);
                  },
                  error: (err) => {
                    console.error(err);
                  },
                });

                this.hasError = false;
              } else {
                console.error('Validation failed');
                this.hasError = true;
              }
            },
            error: (err) => {
              console.error(err);
            },
          });
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
