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
            name: $localize`:nav link@@homeMsg:Home`,
            route: 'list',
        },
        {
            icon: 'edit',
            name: $localize`:nav link@@editMsg:Edit profile`,
            route: 'edit-profile',
        },
        {
            icon: 'add_box',
            name: $localize`:nav link@@createMsg:Create new board`,
            route: 'create-new-board',
        },
    ];

    public isEnActive = true;
    public isRuActive = false;

    constructor(private router: Router) {}

    logOut(): void {
        localStorage.clear();
        this.router.navigate(['auth']);
    }

    toggleClass(): void {
        this.isEnActive = !this.isEnActive;
        this.isRuActive = !this.isRuActive;
    }
}
