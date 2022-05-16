import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ITaskApiResponse } from '@shared/models/board-api-response.model';

@Component({
    selector: 'app-task',
    templateUrl: './task.component.html',
    styleUrls: ['./task.component.scss'],
})
export class TaskComponent {
    @Input() task: ITaskApiResponse;
    @Output() deleteTask: EventEmitter<ITaskApiResponse> = new EventEmitter<ITaskApiResponse>();
    @Output() showTask: EventEmitter<ITaskApiResponse> = new EventEmitter<ITaskApiResponse>();

    onShowTask(): void {
        this.showTask.emit(this.task);
    }
}
