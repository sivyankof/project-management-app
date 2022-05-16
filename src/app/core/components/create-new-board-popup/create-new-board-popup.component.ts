import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IBoard } from '@shared/models/board.model';

@Component({
    selector: 'app-create-new-board-popup',
    templateUrl: './create-new-board-popup.component.html',
    styleUrls: ['./create-new-board-popup.component.scss'],
})
export class CreateNewBoardPopupComponent implements OnInit {
    @Output() createNewBoard: EventEmitter<IBoard> = new EventEmitter<IBoard>();
    public boardForm!: FormGroup;

    constructor(private formBuilder: FormBuilder) {}

    ngOnInit(): void {
        this.boardForm = this.formBuilder.group({
            title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
            description: [
                '',
                [Validators.required, Validators.minLength(3), Validators.maxLength(255)],
            ],
        });
    }

    public get title(): AbstractControl {
        return <AbstractControl>this.boardForm.get('title');
    }

    public get description(): AbstractControl {
        return <AbstractControl>this.boardForm.get('description');
    }

    public onCreate(): void {
        this.boardForm.markAsTouched();
        if (this.boardForm.valid) {
            this.createNewBoard.emit(this.boardForm.value);
        }
    }
}
