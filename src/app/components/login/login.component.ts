import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  private request_token: string = '';

  authService = inject(AuthService);

  onLogin(): void {
    this.authService.getRequestToken().subscribe({
      next: (response) => {
        this.request_token = response.request_token;

        this.authService.validateWithLogin(this.username, this.password, this.request_token).subscribe({
          next: (response) => {
            if (response.success) {
              this.authService.createSession(this.request_token).subscribe({
                next: (response) => {
                  localStorage.setItem('session_id', response.session_id);
                  console.log('Session établie');
                  this.authService.checkIsLoggedIn();
                  console.log('isLoggedIn: ', this.authService.isLoggedIn);
                },
                error: (err) => {
                  console.error(err);
                }
              })
            } else {
              console.error('Validation failed');
            }
          },
          error: (err) => {
            console.error(err);
          }
        })
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

}
