import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ITaskApiResponse } from '@shared/models/board-api-response.model';
import { IUsersForm } from '@shared/models/user.model';

@Component({
    selector: 'app-task-info-form',
    templateUrl: './task-info-form.component.html',
    styleUrls: ['./task-info-form.component.scss'],
})
export class TaskInfoFormComponent implements OnInit {
    @Input() users: IUsersForm[];
    @Input() task: ITaskApiResponse;
    @Output() editTask: EventEmitter<ITaskApiResponse> = new EventEmitter<ITaskApiResponse>();
    taskInfoForm: FormGroup;

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        this.taskInfoForm = this.fb.group({
            title: this.fb.control(this.task.title, [Validators.required, Validators.minLength(3)]),
            description: this.fb.control(this.task.description, [Validators.maxLength(250)]),
            userId: this.fb.control(this.task.userId, [Validators.required]),
        });
    }

    onEditTask(): void {
        this.taskInfoForm.markAsTouched();
        if (this.taskInfoForm.valid) {
            this.editTask.emit(this.taskInfoForm.value);
        }
    }
}
