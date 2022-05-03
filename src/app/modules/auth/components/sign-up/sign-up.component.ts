import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { ISignUp } from '../../models/auth';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit, OnDestroy {
    hide = true;
    regForm: FormGroup;
    destroy$ = new Subject();

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router,
    ) {}

    ngOnInit(): void {
        this.regForm = this.fb.group({
            name: this.fb.control('', [Validators.required, Validators.minLength(3)]),
            login: this.fb.control('', [Validators.required, Validators.minLength(3)]),
            pass: this.fb.group(
                {
                    password: this.fb.control('', [Validators.required, Validators.minLength(5)]),
                    confirmPassword: this.fb.control('', [
                        Validators.required,
                        Validators.minLength(5),
                    ]),
                },
                { validator: this.confirmPassword() },
            ),
        });
    }

    registration(): void {
        this.regForm.markAsTouched();
        if (this.regForm.valid) {
            const body: ISignUp = {
                name: this.regForm.value.name,
                password: this.regForm.value.pass.password,
                login: this.regForm.value.login,
            };

            this.authService
                .registration(body)
                .pipe(takeUntil(this.destroy$))
                .subscribe(
                    () => {
                        this.router.navigate(['auth/sign-in']);
                    },
                    (error) => {
                        console.log(error);
                        this.regForm.setErrors({ conflict: error });
                    },
                );
        }
    }

    private confirmPassword(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: boolean } | null => {
            return control.value.password === control.value.confirmPassword
                ? null
                : { confirmInvalid: true };
        };
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
