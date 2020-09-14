import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { User } from './user.model';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { stringify } from '@angular/compiler/src/util';

export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

const signUpUrl: string = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key';
const signInUrl: string = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key';
const key: string = 'AIzaSyD9KLEL44xgKYfCaa8l42D5AOOQnZWFv6s';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    user = new BehaviorSubject<User>(null);
    private tokenExpirationTimer: any;

    constructor(private http: HttpClient,
        private router: Router) { }

    signup(email: string, password: string) {
        return this.http.post<AuthResponseData>(`${signUpUrl}=${key}`,
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).pipe(catchError(errorResponse => {
            return this.handleError(errorResponse);
        }), tap(responseData => {
            this.handleAuth(responseData.email,
                responseData.localId,
                responseData.idToken,
                +responseData.expiresIn);
        }));
    }

    login(email: string, password: string) {
        return this.http.post<AuthResponseData>(`${signInUrl}=${key}`,
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).pipe(catchError(errorResponse => {
            return this.handleError(errorResponse);
        }), tap(responseData => {
            this.handleAuth(
                responseData.email,
                responseData.localId,
                responseData.idToken,
                +responseData.expiresIn);
        }));
    }

    autoLogin() {
        const user: {
            email: string,
            id: string,
            _token: string,
            _tokenExpirationDate: string
        } = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            return;
        }
        const loadedUser = new User(
            user.email,
            user.id,
            user._token,
            new Date(user._tokenExpirationDate)
        );

        if(loadedUser.token) {
            this.user.next(loadedUser);
            const expirationDuration =
             new Date(user._tokenExpirationDate).getTime() -
             new Date().getTime();
            this.autologout(expirationDuration);
        }
    }

    logout() {
        this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('user');
        if(this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
    }

    autologout(expirationDuration: number) {
        console.log(expirationDuration);
        this.tokenExpirationTimer = setTimeout(() => {
            this.logout();
        }, expirationDuration);
    }

    private handleAuth(email: string, userId: string, token: string, expireIn: number) {
        const expireDate = new Date(new Date().getTime() + +expireIn * 1000);
        const user = new User(email, userId, token, expireDate);
        this.user.next(user);
        this.autologout(expireIn * 1000);
        localStorage.setItem('user', JSON.stringify(user));
    }

    private handleError(errorResponse: HttpErrorResponse) {
        let errorMessage = 'ALARM!';
        if (!errorResponse.error || !errorResponse.error.error) {
            return throwError(errorMessage);
        }
        switch (errorResponse.error.error.message) {
            case 'EMAIL_EXISTS': errorMessage = 'Email exists!';
                break;
            case 'EMAIL_NOT_FOUND': errorMessage = "This email not found!";
                break;
            case 'INVALID_PASSWORD': errorMessage = "Invalid password!"
                break;
        }
        return throwError(errorMessage);
    }

}
