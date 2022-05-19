import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ITask } from '@shared/models/board-api-response.model';

@Component({
    selector: 'app-task',
    templateUrl: './task.component.html',
    styleUrls: ['./task.component.scss'],
})
export class TaskComponent {
    @Input() task: ITask;
    @Output() deleteTask: EventEmitter<ITask> = new EventEmitter<ITask>();
    @Output() showTaskInfo: EventEmitter<never> = new EventEmitter<never>();
}
