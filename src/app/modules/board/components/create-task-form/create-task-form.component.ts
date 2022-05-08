import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-create-task-form',
    templateUrl: './create-task-form.component.html',
    styleUrls: ['./create-task-form.component.scss'],
})
export class CreateTaskFormComponent implements OnInit {
    formCreateTask: FormGroup;

    constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<CreateTaskFormComponent>) {}

    ngOnInit(): void {
        this.formCreateTask = this.fb.group({
            title: this.fb.control('', [Validators.required, Validators.minLength(3)]),
            description: this.fb.control('', [Validators.required, Validators.minLength(3)]),
        });
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    onSubmit(): void {
        this.formCreateTask.markAsTouched();

        if (this.formCreateTask.valid) {
            this.dialogRef.close(this.formCreateTask.value);
        }
    }
}
