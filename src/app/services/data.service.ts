import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { dataList } from '../shared/mock/dataList';
import { IBoardList } from '../shared/models/board-list.interface';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable()
export class DataService {
    constructor(private http: HttpClient) {}

    getListItems(): Observable<IBoardList[]> {
        return of(dataList).pipe(delay(1500));
    }
}
