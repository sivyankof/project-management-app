import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBoard } from '@shared/models/board-list.interface';
import { HttpService } from '@service/http.service';

@Injectable()
export class MainService {
    constructor(private http: HttpService) {}

    getListItems(): Observable<IBoard[]> {
        return this.http.get(`boards`);
    }
}
