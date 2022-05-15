/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpRequest } from '@angular/common/http';
import { API_URL } from '@shared/constants/path.constants';
import { catchError } from 'rxjs/operators';
import { IHttpError } from '@service/http/http.model';

@Injectable()
export class HttpService {
    private readonly pathAPI = API_URL;

    constructor(private http: HttpClient) {}

    public get(
        path: string,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data: any = null,
        options: any = this.getDefaultRequestOptions(),
    ): Observable<any> {
        const fullPath: string = this.getPathWithData(path, data);

        return this.http
            .get(this.pathAPI + fullPath, options)
            .pipe(catchError(this.handleError.bind(this)));
    }

    public post(
        path: string,
        data: any,
        options: any = this.getDefaultRequestOptions(),
    ): Observable<any> {
        return this.http
            .post(this.pathAPI + path, data, options)
            .pipe(catchError(this.handleError.bind(this)));
    }

    public put(
        path: string,
        data: any,
        options: any = this.getDefaultRequestOptions(),
    ): Observable<any> {
        return this.http
            .put(this.pathAPI + path, data, options)
            .pipe(catchError(this.handleError.bind(this)));
    }

    public putWithQueryString(
        path: string,
        data: any,
        options: any = this.getDefaultRequestOptions(),
    ): Observable<any> {
        const fullPath: string = this.getPathWithData(path, data);

        return this.http
            .put(this.pathAPI + fullPath, {}, options)
            .pipe(catchError(this.handleError.bind(this)));
    }

    public patch(
        path: string,
        data: any,
        options: any = this.getDefaultRequestOptions(),
    ): Observable<any> {
        return this.http
            .patch(this.pathAPI + path, data, options)
            .pipe(catchError(this.handleError.bind(this)));
    }

    public delete(
        path: string,
        data: any = null,
        options: any = this.getDefaultRequestOptions(),
    ): Observable<any> {
        const fullPath: string = this.getPathWithData(path, data);

        return this.http
            .delete(this.pathAPI + fullPath, options)
            .pipe(catchError(this.handleError.bind(this)));
    }

    public request(
        method: string,
        path: string,
        formData: any = null,
        options: any = this.getDefaultRequestOptions(),
    ): Observable<any> {
        const fullPath: string = this.getPathWithData(path, formData);
        const req: any = new HttpRequest(method, this.pathAPI + fullPath, formData, options);

        return this.http.request(req).pipe(catchError(this.handleError.bind(this)));
    }

    private getDefaultRequestOptions(): any {
        const header = new HttpHeaders({ 'Content-Type': 'application/json' });

        return { headers: header };
    }

    private getPathWithData(path: string, data: any): string {
        const paramString: string[] = [];
        if (data) {
            for (const p in data) {
                if (data.hasOwnProperty(p)) {
                    paramString.push(encodeURIComponent(p) + '=' + encodeURIComponent(data[p]));
                }
            }
        }

        return path + (paramString.length > 0 ? '?' : '') + paramString.join('&');
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

        const errorObj: IHttpError = { message, status };

        return throwError(errorObj);
    }
}
