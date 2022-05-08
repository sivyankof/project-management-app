import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IBoardApiResponse } from '@shared/models/board-api-response.model';
import { HttpService } from '@service/http.service';
import { take, tap } from 'rxjs/operators';
import { SnackBarService } from '@service/snack-bar.service';

@Injectable()
export class BoardService {
    private boardsId: string;
    private boards$: BehaviorSubject<IBoardApiResponse> = new BehaviorSubject<IBoardApiResponse>(
        null,
    );

    constructor(private http: HttpService, private snackBarService: SnackBarService) {}

    public addBoard(boardTitle: string): void {
        const body = { title: boardTitle };
        this.http.post(`boards`, body).subscribe((response) => {
            if (response['id']) {
                this.snackBarService.openSnackBar(`Board "${boardTitle}" was created`);
            } else {
                this.snackBarService.openSnackBar(`Board was not created!`);
            }
        });
    }

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

        this.http.post(`boards/${id}/columns`, body).subscribe(() => {
            this.initBoards(this.boardsId);
        });
    }

    // Очищает все данные по борде после выхода из компонента
    public destroyBoard(): void {
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
