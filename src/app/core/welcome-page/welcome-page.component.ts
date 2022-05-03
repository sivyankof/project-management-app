import { Component } from '@angular/core';

@Component({
    selector: 'app-welcome-page',
    templateUrl: './welcome-page.component.html',
    styleUrls: ['./welcome-page.component.scss'],
})
export class WelcomePageComponent {
    teamInfo = [
        {
            name: 'Артем',
            avatar: 'https://avatars.githubusercontent.com/u/49230480?v=4',
        },
        {
            name: 'Анна',
            avatar: 'https://annarabychina.github.io/rsschool-cv/img/avatar.jpg',
        },
        {
            name: 'Денис',
            avatar: 'https://github.com/hokmyn/rsschool-cv/blob/rsschool-cv-html/img/photo.jpg?raw=true',
        },
    ];
}
