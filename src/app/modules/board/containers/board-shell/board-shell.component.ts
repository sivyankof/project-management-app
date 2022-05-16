import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { BoardService } from '@modules/board/services/board.service';
import {
    IBoardApiResponse,
    IColumnsApiResponse,
    ITaskApiResponse,
} from '@shared/models/board-api-response.model';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogComponent } from '@shared/components/dialog/dialog.component';
import { take } from 'rxjs/operators';
import { TaskInfoPopupPageComponent } from '../task-info-popup-page/task-info-popup-page.component';

@Component({
    selector: 'app-board-shell',
    templateUrl: './board-shell.component.html',
    styleUrls: ['./board-shell.component.scss'],
    providers: [BoardService],
})
export class BoardShellComponent implements OnInit {
    public boards$: Observable<IBoardApiResponse>;

    constructor(
        private route: ActivatedRoute,
        private boardService: BoardService,
        private dialog: MatDialog,
    ) {}

    ngOnInit(): void {
        this.route.queryParams.subscribe((params: Params) => {
            this.boardService.initBoards(params.id);

            this.boards$ = this.boardService.getBoards();
        });
    }

    onAddTask(data: { task: ITaskApiResponse; columnId: string }): void {
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

    onDeleteColumn(column: IColumnsApiResponse): void {
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

    onEditColumn(column: IColumnsApiResponse): void {
        this.boardService.editColumn(column);
    }

    onDeleteTask(data: { task: ITaskApiResponse; columnId: string }): void {
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

    onShowTaskDialog(task: ITaskApiResponse): void {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.maxWidth = '500px';
        dialogConfig.width = '100%';
        dialogConfig.data = task;
        const dialog = this.dialog.open(TaskInfoPopupPageComponent, dialogConfig);
        const order = task.order;
        const done = task.done;
        const columnId = task.columnId;
        dialog.afterClosed().subscribe((response) => {
            const editedTask = { ...response, order, done, columnId };
            this.boardService.editTask(editedTask, task.id);
        });
    }
}
