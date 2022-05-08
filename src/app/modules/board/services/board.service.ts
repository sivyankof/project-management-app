import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IBoardApiResponse } from '@shared/models/board-api-response.model';
import { HttpService } from '@service/http.service';
import { take, tap } from 'rxjs/operators';

@Injectable()
export class BoardService implements OnDestroy {
    private boardsId: string;
    private boards$: BehaviorSubject<IBoardApiResponse> = new BehaviorSubject<IBoardApiResponse>(
        null,
    );

    constructor(private http: HttpService) {}

    // Получаем весь стейт в виде обзерва Один раз полдписывается и он автоматичеки обновляется
    public getBoards(): Observable<IBoardApiResponse> {
        return this.boards$.asObservable();
    }

    // Инициализирует загрузку всей борды
    public initBoards(id: string): void {
        this.init(id);
    }

    // Добавляем новую доску и обновляем наш стейт
    public addColumn(title: string): void {
        const { id, columns } = this.boards$.getValue();
        const body = { title: title, order: columns.length };

        this.http
            .post(`boards/${id}/columns`, body)
            .pipe(take(1))
            .subscribe(() => {
                this.initBoards(this.boardsId);
            });
    }

    public deleteColumn(columnId: string): void {
        this.http
            .delete(`boards/${this.boardsId}/columns/${columnId}`)
            .pipe(take(1))
            .subscribe(() => {
                this.initBoards(this.boardsId);
            });
    }

    // Очищает все данные по борде после выхода из компонента
    ngOnDestroy(): void {
        this.boards$.next(null);
        this.boards$.complete();
    }

    private init(id: string): void {
        this.http
            .get(`boards/${id}`)
            .pipe(
                take(1),
                tap(() => (this.boardsId = id)),
            )
            .subscribe((boards) => this.boards$.next(boards));
    }
}
