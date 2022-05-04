import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '@shared/constants/path.constants';
import { dataList } from '@shared/mock/dataList';
import { IBoardList } from '@shared/models/board-list.interface';

@Injectable()
export class DataService {
    private readonly pathAPI = API_URL;

    constructor(private http: HttpClient) {}

    getListItems(): Observable<IBoardList[]> {
        return of(dataList).pipe(delay(1500));
    }
}
