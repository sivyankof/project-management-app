import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild {
    constructor(private router: Router) {}

    canActivate(): boolean {
        const token = localStorage.getItem('access-token');

        if (token) {
            return true;
        } else {
            this.router.navigate(['auth', 'sign-in']);

            return false;
        }
    }

    public canActivateChild(): boolean {
        return this.canActivate();
    }
}
