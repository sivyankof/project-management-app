import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ISignIn, ISignUp } from '../models/auth';
import { HttpService } from '@service/http.service';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(private http: HttpService) {}

    public singIn(form: ISignIn): Observable<ISignIn> {
        return this.http.post(`signin`, form);
    }

    public registration(form: ISignUp): Observable<ISignUp> {
        return this.http.post(`signup`, form);
    }
}
