import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpService } from '@service/http/http.service';
import { take } from 'rxjs/operators';
import { IBoard } from '@shared/models/board-api-response.model';

@Injectable()
export class MainService implements OnDestroy {
    private listBoard$: BehaviorSubject<IBoard[]> = new BehaviorSubject<IBoard[]>(null);

    constructor(private http: HttpService) {}

    // инициализирует список
    init(): void {
        this.getListItems()
            .pipe(take(1))
            .subscribe((boards: IBoard[]) => this.listBoard$.next(boards));
    }

    // скачать спиков
    getStateBoards(): Observable<IBoard[]> {
        return this.listBoard$.asObservable();
    }

    //удалить один эелемент и обновить список
    deleteBoard(id: string): void {
        this.http
            .delete(`boards/${id}`)
            .pipe(take(1))
            .subscribe(() => this.init());
    }

    //при удалении компонента весь обсерв удаляется
    ngOnDestroy(): void {
        this.listBoard$.next(null);
        this.listBoard$.complete();
    }

    private getListItems(): Observable<IBoard[]> {
        return this.http.get(`boards`);
    }
}
