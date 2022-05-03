import { Injectable } from '@angular/core';
import { dataList } from '../shared/mock/dataList';
import { IBoardList } from '../shared/models/board-list.interface';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable()
export class DataService {
    private URL = 'http://localhost:4200/api/';

    getListItems(): Observable<IBoardList[]> {
        return of(dataList).pipe(delay(1500));
    }
}
