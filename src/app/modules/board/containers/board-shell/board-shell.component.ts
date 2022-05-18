import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { BoardService } from '@modules/board/services/board.service';
import { IBoard, IColumns, ITask } from '@shared/models/board-api-response.model';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogComponent } from '@shared/components/dialog/dialog.component';
import { take } from 'rxjs/operators';
import { TaskInfoPopupShellComponent } from '../task-info-popup-shell/task-info-popup-shell.component';
import { AsyncPipe } from '@angular/common';
import { ITaskOfColumn } from '@modules/board/model/column.interface';

@Component({
    selector: 'app-board-shell',
    templateUrl: './board-shell.component.html',
    styleUrls: ['./board-shell.component.scss'],
    providers: [BoardService, AsyncPipe],
})
export class BoardShellComponent implements OnInit {
    public boards$: Observable<IBoard>;

    constructor(
        private route: ActivatedRoute,
        private boardService: BoardService,
        private dialog: MatDialog,
        private asyncPipe: AsyncPipe,
    ) {}

    ngOnInit(): void {
        this.route.queryParams.subscribe((params: Params) => {
            this.boardService.initBoards(params.id);

            this.boards$ = this.boardService.getBoards();
        });
    }

    onAddTask(data: ITaskOfColumn): void {
        const userId = JSON.parse(localStorage.getItem('login')).id;
        const updateTask = { ...data.task, userId };

        this.boardService.addTask(data.columnId, updateTask);
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
                    this.boardService.deleteTask(data.task.id, data.columnId);
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

    movedTask(data: { tasks: ITask[]; column: IColumns }): void {
        data.tasks.forEach((task: ITask) => {
            const updateTask = {
                title: task.title,
                done: task.done,
                order: task.order,
                description: task.description,
                userId: JSON.parse(localStorage.getItem('login')).id,
                boardId: this.asyncPipe.transform(this.boards$).id,
                columnId: data.column.id,
            };

            this.boardService.updateTask(updateTask, task.id).pipe(take(1)).subscribe();
        });
    }
}
