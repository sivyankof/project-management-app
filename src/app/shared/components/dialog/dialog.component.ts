import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
    public newTitleFormControl: FormControl;

    constructor(
        public dialogRef: MatDialogRef<DialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { nameItem: string; inputTitle?: boolean },
        private fb: FormBuilder,
    ) {}

    ngOnInit(): void {
        this.newTitleFormControl = this.fb.control('Title', Validators.required);
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}
