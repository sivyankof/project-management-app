import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
    public links = [
        {
            icon: 'home',
            name: 'Home',
            route: 'list',
        },
        {
            icon: 'edit',
            name: 'Edit profile',
            route: 'edit-profile',
        },
    ];

    constructor(private router: Router) {}

    logOut(): void {
        localStorage.clear();
        this.router.navigate(['auth']);
    }
}
