import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IColumns, ITask } from '@shared/models/board-api-response.model';
import { MatDialog } from '@angular/material/dialog';
import { CreateTaskFormComponent } from '@modules/board/components/create-task-form/create-task-form.component';
import { take } from 'rxjs/operators';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ITaskOfColumn } from '@modules/board/model/column.interface';

@Component({
    selector: 'app-column',
    templateUrl: './column.component.html',
    styleUrls: ['./column.component.scss'],
})
export class ColumnComponent implements OnInit {
    @Input() column: IColumns;
    @Input() arrayColumnsId: string[];

    @Output() deleteColumn: EventEmitter<IColumns> = new EventEmitter<IColumns>(null);
    @Output() editColumn: EventEmitter<IColumns> = new EventEmitter<IColumns>();
    @Output() addTask: EventEmitter<ITaskOfColumn> = new EventEmitter<ITaskOfColumn>();
    @Output() deleteTask: EventEmitter<ITaskOfColumn> = new EventEmitter<ITaskOfColumn>();
    @Output() showTask: EventEmitter<ITaskOfColumn> = new EventEmitter<ITaskOfColumn>();
    @Output() movedTask: EventEmitter<{ tasks: ITask[]; columnId: string }> = new EventEmitter<{
        tasks: ITask[];
        columnId: string;
    }>();
    @Output() movedTaskToNearColumn: EventEmitter<{
        task: ITask;
        columnId: string;
        prevColumnId: string;
        prevTaskId: string;
        updatedTasks: ITask[];
    }> = new EventEmitter<{
        task: ITask;
        columnId: string;
        prevColumnId: string;
        prevTaskId: string;
        updatedTasks: ITask[];
    }>();

    public columnForm!: FormGroup;
    public isEdit = false;

    constructor(private dialog: MatDialog, private formBuilder: FormBuilder) {}

    public ngOnInit(): void {
        // console.log(this)
        // this.column.tasks.sort((a: ITask, b: ITask) => a.order - b.order);

        this.columnForm = this.formBuilder.group({
            title: [
                this.column.title,
                [Validators.required, Validators.minLength(3), Validators.maxLength(100)],
            ],
        });
    }

    public onDeleteColumn(column: IColumns): void {
        this.deleteColumn.emit(column);
    }

    public onAddTask(column: IColumns): void {
        const dialogRef = this.dialog.open(CreateTaskFormComponent);
        const done = false;
        const order = column.tasks.length;

        dialogRef
            .afterClosed()
            .pipe(take(1))
            .subscribe((result) => {
                if (result) {
                    const task = { ...result, order, done };
                    this.addTask.emit({ task, columnId: this.column.id });
                }
            });
    }

    public drop(event: CdkDragDrop<ITask[]>): void {
        if (event.previousContainer === event.container) {
            if (event.previousIndex !== event.currentIndex) {
                moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
                const updatedTasks = this.updatedTasks();

                this.movedTask.emit({ tasks: updatedTasks, columnId: this.column.id });
            }
        } else {
            transferArrayItem(
                event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex,
            );

            const task = event.container.data[event.currentIndex];

            const newTask = {
                title: task.title,
                done: task.done,
                order: event.currentIndex,
                description: task.description,
                userId: JSON.parse(localStorage.getItem('login')).id,
            };

            const updatedTasks = this.updatedTasks();

            this.movedTaskToNearColumn.emit({
                task: newTask,
                columnId: this.column.id,
                prevColumnId: event.previousContainer.id,
                prevTaskId: task.id,
                updatedTasks: updatedTasks,
            });
        }
    }

    public onEditTitle(): void {
        this.isEdit = !this.isEdit;
    }

    public onSubmit(): void {
        this.isEdit = !this.isEdit;
        this.editColumn.emit({
            id: this.column.id,
            ...this.columnForm.value,
            order: this.column.order,
        });
    }

    public get title(): AbstractControl {
        return <AbstractControl>this.columnForm.get('title');
    }

    private updatedTasks(): ITask[] {
        return this.column.tasks.map((task: ITask, i: number) => {
            task.order = i;
            return task;
        });
    }
}
