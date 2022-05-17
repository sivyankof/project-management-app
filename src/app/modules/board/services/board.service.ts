import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IBoard, IColumns, ITask } from '@shared/models/board-api-response.model';
import { HttpService } from '@service/http/http.service';
import { take, tap } from 'rxjs/operators';
import { SnackBarService } from '@service/snack-bar.service';

@Injectable()
export class BoardService implements OnDestroy {
    private boardsId: string;
    private boards$: BehaviorSubject<IBoard> = new BehaviorSubject<IBoard>(null);

    constructor(private http: HttpService, private snackBarService: SnackBarService) {}

    public addBoard(newBoard: IBoard): Observable<IBoard> {
        return this.http.post(`boards`, newBoard).pipe(take(1));
    }

    // Получаем весь стейт в виде обзерва Один раз полдписывается и он автоматичеки обновляется
    public getBoards(): Observable<IBoard> {
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

    public addTask(columnId: string, task: ITask): void {
        this.http
            .post(`boards/${this.boardsId}/columns/${columnId}/tasks`, task)
            .pipe(take(1))
            .subscribe(() => this.initBoards(this.boardsId));
    }

    public deleteColumn(columnId: string): void {
        this.http
            .delete(`boards/${this.boardsId}/columns/${columnId}`)
            .pipe(take(1))
            .subscribe(() => {
                this.initBoards(this.boardsId);
            });
    }

    public editColumn(column: IColumns): void {
        const editedColumn = { title: column.title, order: column.order };

        this.http
            .put(`boards/${this.boardsId}/columns/${column.id}`, editedColumn)
            .pipe(take(1))
            .subscribe(() => {
                this.initBoards(this.boardsId);
            });
    }

    public deleteTask(taskId: string, columnId: string): void {
        this.http
            .delete(`boards/${this.boardsId}/columns/${columnId}/tasks/${taskId}`)
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

    public updateTask(
        task: {
            title: string;
            done: boolean;
            order: number;
            description: string;
            userId: string;
            boardId: string;
            columnId: string;
        },
        taskId: string,
    ): Observable<ITask> {
        return this.http.put(
            `boards/${task.boardId}/columns/${task.columnId}/tasks/${taskId}`,
            task,
        );
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

    public editTask(task: ITask, taskId: string): void {
        const boardId = this.boardsId;
        const updateTask = { ...task, boardId };
        this.http
            .put(`boards/${this.boardsId}/columns/${task.columnId}/tasks/${taskId}`, updateTask)
            .pipe(take(1))
            .subscribe(() => this.initBoards(this.boardsId));
    }
}
