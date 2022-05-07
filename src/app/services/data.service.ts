import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '@shared/constants/path.constants';
import { IBoard } from '@shared/models/board-list.interface';

@Injectable()
export class DataService {
    private readonly pathAPI = API_URL;

    constructor(private http: HttpClient) {}

    getListItems(): Observable<IBoard[]> {
        return this.http.get<IBoard[]>(`${this.pathAPI}boards`);
    }
}
