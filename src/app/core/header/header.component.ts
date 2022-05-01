import { Component } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
    public links = [
        {
            icon: 'edit',
            name: 'Edit profile',
            route: '/edit-profile',
        },
        {
            icon: 'add_box',
            name: 'Create new board',
            route: '/create-new-board',
        },
    ];
}
