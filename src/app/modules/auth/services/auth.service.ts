import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ISignIn, ISignUp } from '../models/auth';
import { API_URL } from '@shared/constants/path.constants';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private readonly URL = API_URL;

    constructor(private http: HttpClient) {}

    public singIn(form: ISignIn): Observable<ISignIn> {
        return this.http
            .post(`${this.URL}signin`, form, this.getDefaultRequestOptions())
            .pipe(catchError(this.handleError.bind(this)));
    }

    public registration(form: ISignUp): Observable<ISignUp> {
        return this.http
            .post<ISignUp>(`${this.URL}signup`, form, this.getDefaultRequestOptions())
            .pipe(catchError(this.handleError.bind(this)));
    }

    //--------------------------------OPTIONS AND ERRORS--------------------------------

    private getDefaultRequestOptions() {
        const header = new HttpHeaders({
            'Content-Type': 'application/json',
        });
        return { headers: header };
    }

    private handleError(err: HttpErrorResponse | ErrorEvent | any): any {
        let message: string;
        let status: number;
        if (err.error instanceof ErrorEvent) {
            message = `An error occurred: ${err.error.message}`;
            status = err.error.status;
        } else {
            message = `Backend returned code ${err.status}: ${err.message}`;
            status = err.status;
        }

        console.error(message);

        const errorObj = { message, status };

        return throwError(errorObj);
    }
}
