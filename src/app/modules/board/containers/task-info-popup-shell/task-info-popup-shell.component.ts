import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from '@service/user.service';
import { ITask } from '@shared/models/board-api-response.model';
import { IUsersForm } from '@shared/models/user.model';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-task-info-popup-shell',
    templateUrl: './task-info-popup-shell.component.html',
    styleUrls: ['./task-info-popup-shell.component.scss'],
    providers: [UserService],
})
export class TaskInfoPopupShellComponent implements OnInit {
    public users$: Observable<IUsersForm[]>;
    taskInfoForm: FormGroup;

    constructor(
        @Inject(MAT_DIALOG_DATA) public task: ITask,
        private userService: UserService,
        private fb: FormBuilder,
    ) {}

    ngOnInit(): void {
        this.userService.initUsers();
        this.users$ = this.userService.getUsers();

        this.taskInfoForm = this.fb.group({
            title: this.fb.control(this.task.title, [Validators.required, Validators.minLength(3)]),
            description: this.fb.control(this.task.description, [Validators.maxLength(250)]),
            userId: this.fb.control(this.task.userId, [Validators.required]),
        });
    }
}
