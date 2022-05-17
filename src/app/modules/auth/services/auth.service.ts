import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ISignIn, ISignUp } from '../models/auth';
import { HttpService } from '@service/http/http.service';
import { map, take } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(private http: HttpService) {}

    public singIn(form: ISignIn): Observable<ISignIn> {
        localStorage.setItem('login', JSON.stringify({ login: form.login, id: '' }));

        return this.http.post(`signin`, form);
    }

    public registration(form: ISignUp): Observable<ISignUp> {
        return this.http.post(`signup`, form);
    }

    public getUserId(): void {
        this.http
            .get('users')
            .pipe(
                take(1),
                map((users) => {
                    return users.filter((user) => {
                        const localLogin = JSON.parse(localStorage.getItem('login'));
                        if (localLogin.login === user.login) {
                            return user.id;
                        }
                    });
                }),
            )
            .subscribe((user) => {
                const localLogin = JSON.parse(localStorage.getItem('login'));
                localLogin.id = user[0].id;

                localStorage.setItem('login', JSON.stringify(localLogin));
            });
    }
}
