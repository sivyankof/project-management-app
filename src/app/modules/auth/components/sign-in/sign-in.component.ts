import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit, OnDestroy {
    hide = true;
    loginForm: FormGroup;
    private destroy$ = new Subject();

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router,
    ) {}

    ngOnInit(): void {
        this.loginForm = this.fb.group({
            login: this.fb.control('', [Validators.required, Validators.minLength(3)]),
            password: this.fb.control('', [Validators.required, Validators.minLength(5)]),
        });
    }

    login(): void {
        this.loginForm.markAsTouched();
        if (this.loginForm.valid) {
            this.authService
                .singIn(this.loginForm.value)
                .pipe(takeUntil(this.destroy$))
                .subscribe(
                    (data) => {
                        if (data['token'] != null) {
                            localStorage.setItem('access-token', data['token']);

                            this.authService.getUserId();

                            this.router.navigate(['../', 'main']);
                        } else {
                            console.log('check your credentials !!');
                        }
                    },
                    () => {
                        this.loginForm.setErrors({
                            loginErr: $localize`:user not found msg@@userErr: User was not founded!`,
                        });
                    },
                );
        }
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
