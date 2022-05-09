import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ISignUp } from '@modules/auth/models/auth';
import { UserService } from '@service/user.service';
import { IUser } from '@shared/models/user.model';

@Component({
    selector: 'app-edit-profile',
    templateUrl: './edit-profile.component.html',
    styleUrls: ['./edit-profile.component.scss'],
    providers: [UserService],
})
export class EditProfileComponent implements OnInit {
    @Input() public user: IUser;
    @Output() deleteUser: EventEmitter<IUser> = new EventEmitter<IUser>();
    @Output() editUser: EventEmitter<ISignUp> = new EventEmitter<ISignUp>();
    public editProfileForm!: FormGroup;
    hide = true;

    constructor(private formBuilder: FormBuilder) {}

    ngOnInit(): void {
        this.editProfileForm = this.formBuilder.group({
            name: [
                this.user.name,
                [Validators.required, Validators.minLength(3), Validators.maxLength(20)],
            ],
            login: [this.user.login, [Validators.required, Validators.minLength(3)]],
            password: ['', [Validators.required, Validators.minLength(5)]],
        });
    }

    onEditUser(): void {
        this.editProfileForm.markAsTouched();
        if (this.editProfileForm.valid) {
            this.editUser.emit(this.editProfileForm.value);
        }
    }

    onDeleteUser(): void {
        this.deleteUser.emit(this.user);
    }

    goBack(): void {
        history.back();
    }
}
