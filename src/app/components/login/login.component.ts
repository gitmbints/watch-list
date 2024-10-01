import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, finalize, of, switchMap } from 'rxjs';
import { SpinnerComponent } from '../shared/spinner/spinner.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, SpinnerComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  hasError: boolean = false;
  isLoading: boolean = false;

  authService: AuthService = inject(AuthService);
  router: Router = inject(Router);

  onLogin(): void {
    this.isLoading = true;
    this.hasError = false;

    this.authService
      .getRequestToken()
      .pipe(
        switchMap((response) => {
          return this.authService.validateWithLogin(
            this.username,
            this.password,
            response.request_token,
          );
        }),
        switchMap((validateResponse) => {
          if (!validateResponse.success) {
            this.hasError = true;
            return of(null);
          }
          return this.authService.createSession(validateResponse.request_token);
        }),
        catchError((error) => {
          console.error(error);
          this.hasError = true;
          return of(null);
        }),
        finalize(() => {
          this.isLoading = false;
        }),
      )
      .subscribe((sessionResponse) => {
        if (sessionResponse?.session_id) {
          this.authService.setSession(sessionResponse.session_id);
          this.router.navigate(['/to-watch']);
        }
      });
  }
}
