import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from '@service/user.service';
import { ITaskApiResponse } from '@shared/models/board-api-response.model';
import { IUsersForm } from '@shared/models/user.model';

@Component({
    selector: 'app-task-info-popup-page',
    templateUrl: './task-info-popup-page.component.html',
    styleUrls: ['./task-info-popup-page.component.scss'],
    providers: [UserService],
})
export class TaskInfoPopupPageComponent implements OnInit {
    public users: IUsersForm[] = [];
    @Output() editTask: EventEmitter<ITaskApiResponse> = new EventEmitter<ITaskApiResponse>();

    constructor(
        @Inject(MAT_DIALOG_DATA) public task: ITaskApiResponse,
        private userService: UserService,
    ) {}

    ngOnInit(): void {
        this.userService.initUsers();
        this.userService.getUsers().subscribe((users) => (this.users = users));
    }

    onEditTask(task: ITaskApiResponse): void {
        this.editTask.emit(task);
    }
}
