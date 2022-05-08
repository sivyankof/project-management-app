import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ISignUp } from '@modules/auth/models/auth';

@Component({
    selector: 'app-edit-profile',
    templateUrl: './edit-profile.component.html',
    styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
    @Input() public user: ISignUp;
    public editProfileForm!: FormGroup;
    hide = true;

    constructor(private formBuilder: FormBuilder, private router: Router) {}

    ngOnInit(): void {
        this.editProfileForm = this.formBuilder.group({
            name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
            login: ['', [Validators.required, Validators.minLength(3)]],
            password: ['', [Validators.required, Validators.minLength(5)]],
        });
    }

    goBack(): void {
        history.back();
    }
}
