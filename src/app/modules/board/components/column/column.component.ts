import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IColumnsApiResponse, ITaskApiResponse } from '@shared/models/board-api-response.model';
import { MatDialog } from '@angular/material/dialog';
import { CreateTaskFormComponent } from '@modules/board/components/create-task-form/create-task-form.component';
import { take } from 'rxjs/operators';

@Component({
    selector: 'app-column',
    templateUrl: './column.component.html',
    styleUrls: ['./column.component.scss'],
})
export class ColumnComponent {
    @Input() column: IColumnsApiResponse;
    @Input() index: number;

    @Output() deleteColumn: EventEmitter<IColumnsApiResponse> =
        new EventEmitter<IColumnsApiResponse>(null);

    @Output() addTask: EventEmitter<{ columnId: string; task: ITaskApiResponse }> =
        new EventEmitter<{
            columnId: string;
            task: ITaskApiResponse;
        }>();

    @Output() deleteTask: EventEmitter<{ task: ITaskApiResponse; columnId: string }> =
        new EventEmitter<{ task: ITaskApiResponse; columnId: string }>();

    constructor(private dialog: MatDialog) {}

    onDeleteColumn(column: IColumnsApiResponse): void {
        this.deleteColumn.emit(column);
    }

    onAddTask(column: IColumnsApiResponse): void {
        const dialogRef = this.dialog.open(CreateTaskFormComponent);

        const order = column.tasks.length;

        dialogRef
            .afterClosed()
            .pipe(take(1))
            .subscribe((result) => {
                const task = { ...result, order };

                this.addTask.emit({ task, columnId: this.column.id });
            });
    }
}
