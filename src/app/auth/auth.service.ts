import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthService {
    /** A fake JWT response. */
     fakeJWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

    /** Whether the user is logged in. */
    get isAuthenticated() {
        return this.getToken() != null;
    }

    /** Retrieve the users token. */
    getToken(): string | null {
        return sessionStorage.getItem('token');
    }

    /**
     * Logs the user in.
     * @param email The email of the user.
     * @param password The password of the user.
     */
    login(email: string, password: string) {
        const fakeResponse = {
            authenticated: true,
            token: this.fakeJWT,
            user: {
                name: 'John',
                surname: 'Doe',
                email: email
            }
        }
        return of(fakeResponse).pipe(
            tap((r) => {
                sessionStorage.setItem('token', r.token);
            })
        );
    }

    /**
     * Logs the user out.
     */
    logout() {
        sessionStorage.removeItem('token');
    }
}

/**
 * Api to log someone in.
 */
export interface loginApi {
    authenticated: boolean;
    token: string;
    user: {
        name: string;
        surname: string;
        email: string;
    };
}
