import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '@shared/constants/path.constants';
import { IBoard } from '@shared/models/board.model';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class BoardService {
    private readonly URL = API_URL;
    constructor(private http: HttpClient) {}

    public createBoard(boardTitle: string): Observable<IBoard> {
        console.log(boardTitle);
        return this.http
            .post(
                `${this.URL}boards`,
                {
                    title: boardTitle,
                },
                this.getDefaultRequestOptions(),
            )
            .pipe(catchError(this.handleError.bind(this)));
    }

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
