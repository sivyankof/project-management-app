import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IColumnsApiResponse, ITaskApiResponse } from '@shared/models/board-api-response.model';
import { MatDialog } from '@angular/material/dialog';
import { CreateTaskFormComponent } from '@modules/board/components/create-task-form/create-task-form.component';
import { take } from 'rxjs/operators';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-column',
    templateUrl: './column.component.html',
    styleUrls: ['./column.component.scss'],
})
export class ColumnComponent implements OnInit {
    @Input() column: IColumnsApiResponse;
    @Input() index: number;

    @Output() deleteColumn: EventEmitter<IColumnsApiResponse> =
        new EventEmitter<IColumnsApiResponse>(null);

    @Output() editColumn: EventEmitter<IColumnsApiResponse> =
        new EventEmitter<IColumnsApiResponse>();

    @Output() addTask: EventEmitter<{ columnId: string; task: ITaskApiResponse }> =
        new EventEmitter<{
            columnId: string;
            task: ITaskApiResponse;
        }>();

    @Output() deleteTask: EventEmitter<{ task: ITaskApiResponse; columnId: string }> =
        new EventEmitter<{ task: ITaskApiResponse; columnId: string }>();

    public columnForm!: FormGroup;
    public isEdit = false;

    constructor(private dialog: MatDialog, private formBuilder: FormBuilder) {}

    ngOnInit(): void {
        this.columnForm = this.formBuilder.group({
            title: [
                this.column.title,
                [Validators.required, Validators.minLength(3), Validators.maxLength(100)],
            ],
        });
    }

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

    onEditTitle(): void {
        this.isEdit = !this.isEdit;
    }

    onSubmit(): void {
        this.editColumn.emit({
            id: this.column.id,
            ...this.columnForm.value,
            order: this.column.order,
        });
    }

    public get title(): AbstractControl {
        return <AbstractControl>this.columnForm.get('title');
    }
}
