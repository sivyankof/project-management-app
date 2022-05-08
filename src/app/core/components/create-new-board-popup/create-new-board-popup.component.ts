import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-create-new-board-popup',
    templateUrl: './create-new-board-popup.component.html',
    styleUrls: ['./create-new-board-popup.component.scss'],
})
export class CreateNewBoardPopupComponent implements OnInit {
    @Output() createNewBoard = new EventEmitter<string>();
    public boardForm!: FormGroup;
    constructor(private formBuilder: FormBuilder) {}

    ngOnInit(): void {
        this.boardForm = this.formBuilder.group({
            title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
        });
    }

    public get title(): AbstractControl {
        return <AbstractControl>this.boardForm.get('title');
    }

    public onCreate(): void {
        this.boardForm.markAsTouched();
        if (this.boardForm.valid) {
            this.createNewBoard.emit(this.boardForm.value.title);
        }
    }
}
