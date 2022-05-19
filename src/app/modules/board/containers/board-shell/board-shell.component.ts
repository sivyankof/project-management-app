import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { BoardService } from '@modules/board/services/board.service';
import { IBoard, IColumns, ITask } from '@shared/models/board-api-response.model';
import { forkJoin, Observable, Subject } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogComponent } from '@shared/components/dialog/dialog.component';
import { take, tap } from 'rxjs/operators';
import { TaskInfoPopupShellComponent } from '../task-info-popup-shell/task-info-popup-shell.component';
import { AsyncPipe } from '@angular/common';
import { ITaskOfColumn } from '@modules/board/model/column.interface';

@Component({
    selector: 'app-board-shell',
    templateUrl: './board-shell.component.html',
    styleUrls: ['./board-shell.component.scss'],
    providers: [BoardService, AsyncPipe],
})
export class BoardShellComponent implements OnInit, OnDestroy {
    public boards$: Observable<IBoard>;
    public arrayColumnsId: string[];
    private destroy$ = new Subject();
    private paramId: string;

    constructor(
        private route: ActivatedRoute,
        private boardService: BoardService,
        private dialog: MatDialog,
        private asyncPipe: AsyncPipe,
    ) {}

    ngOnInit(): void {
        this.route.queryParams.subscribe((params: Params) => {
            this.paramId = params.id;
            this.boardService.initBoards(params.id);

            this.boards$ = this.boardService.getBoards().pipe(
                tap((board) => {
                    this.arrayColumnsId = board?.columns.map((column) => column.id);
                }),
            );
        });
    }

    onAddTask(data: ITaskOfColumn): void {
        const userId = JSON.parse(localStorage.getItem('login')).id;
        const updateTask = { ...data.task, userId };

        this.boardService.addTask(data.columnId, updateTask).pipe(take(1)).subscribe();
    }

    addColumn(): void {
        const config = {
            data: {
                inputTitle: true,
            },
        };

        this.openDialog(DialogComponent, config)
            .pipe(take(1))
            .subscribe((result) => {
                if (result) {
                    this.boardService.addColumn(result);
                }
            });
    }

    onDeleteColumn(column: IColumns): void {
        const config = {
            data: {
                nameItem: column.title,
            },
        };

        this.openDialog(DialogComponent, config)
            .pipe(take(1))
            .subscribe((result) => {
                if (result) {
                    this.boardService.deleteColumn(column.id);
                }
            });
    }

    onEditColumn(column: IColumns): void {
        this.boardService.editColumn(column);
    }

    onDeleteTask(data: ITaskOfColumn): void {
        const config = {
            data: {
                nameItem: data.task.title,
            },
        };

        this.openDialog(DialogComponent, config)
            .pipe(take(1))
            .subscribe((res) => {
                if (res) {
                    this.boardService
                        .deleteTask(data.task.id, data.columnId)
                        .pipe(take(1))
                        .subscribe();
                }
            });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private openDialog(component, config?): Observable<any> {
        const dialogRef = this.dialog.open(component, config);

        return dialogRef.afterClosed();
    }

    onShowTaskDialog({ task, columnId }: ITaskOfColumn): void {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.maxWidth = '500px';
        dialogConfig.width = '100%';
        dialogConfig.data = task;

        const dialog = this.dialog.open(TaskInfoPopupShellComponent, dialogConfig);
        const order = task.order;
        const done = task.done;

        dialog.afterClosed().subscribe((response) => {
            if (response) {
                const editedTask = { ...response, order, done, columnId };
                this.boardService.editTask(editedTask, task.id);
            }
        });
    }

    movedTask(data: { tasks: ITask[]; columnId: string }): void {
        data.tasks.forEach((task: ITask) => {
            const updateTask = this.updateTask(task, data.columnId);

            this.boardService.updateTask(updateTask, task.id).pipe(take(1)).subscribe();
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    movedTaskToNearColumn(data: {
        task: ITask;
        columnId: string;
        prevColumnId: string;
        prevTaskId: string;
        updatedTasks: ITask[];
    }): void {
        forkJoin({
            task: this.boardService.addTask(data.columnId, data.task),
            deleted: this.boardService.deleteTask(data.prevTaskId, data.prevColumnId),
        }).subscribe();
    }

    private updateTask(task, columnId): ITask {
        return {
            title: task.title,
            done: task.done,
            order: task.order,
            description: task.description,
            userId: JSON.parse(localStorage.getItem('login')).id,
            boardId: this.asyncPipe.transform(this.boards$).id,
            columnId: columnId,
        };
    }
}
