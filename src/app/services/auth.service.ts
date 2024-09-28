import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticatedSubject: BehaviorSubject<boolean>;

  private BASE_URL = environment.tmdb.baseUrl;
  private TOKEN = environment.tmdb.token;

  private http = inject(HttpClient);

  private headers = new HttpHeaders({
    accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${this.TOKEN}`,
  });

  constructor() {
    this.isAuthenticatedSubject = new BehaviorSubject<boolean>(
      this.isAuthenticated(),
    );
  }

  // Step 1 -- Get request Token
  getRequestToken(): Observable<any> {
    const url = `${this.BASE_URL}/authentication/token/new`;

    return this.http
      .get<any>(url, {
        headers: this.headers,
      })
      .pipe(catchError((error) => this.handleError(error, {})));
  }

  // Step 2 -- Validate request Token with login
  validateWithLogin(
    username: string,
    password: string,
    request_token: string,
  ): Observable<any> {
    const url = `${this.BASE_URL}/authentication/token/validate_with_login`;
    const body = {
      username,
      password,
      request_token,
    };

    return this.http
      .post<any>(url, body, {
        headers: this.headers,
      })
      .pipe(catchError((error) => this.handleError(error, {})));
  }

  // Step 3 -- Create Session
  createSession(request_token: string): Observable<any> {
    const url = `${this.BASE_URL}/authentication/session/new`;
    const body = {
      request_token,
    };

    return this.http
      .post<any>(url, body, {
        headers: this.headers,
      })
      .pipe(catchError((error) => this.handleError(error, {})));
  }

  setSession(sessionId: string): void {
    localStorage.setItem('session_id', sessionId);
    this.isAuthenticatedSubject.next(true);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('session_id');
  }

  getAuthStatus(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  logout(): void {
    localStorage.removeItem('session_id');
    this.isAuthenticatedSubject.next(false);
  }

  /* Error handling */
  private handleError(error: Error, errorValue: any) {
    console.error(error);
    return of(errorValue);
  }
}
