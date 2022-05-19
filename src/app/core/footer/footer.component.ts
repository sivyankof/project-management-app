import { Component } from '@angular/core';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
    info = [
        {
            name: 'Артем',
            linkGit: 'https://github.com/sivyankof/',
            avatar: 'https://avatars.githubusercontent.com/u/49230480?v=4',
        },
        {
            name: 'Анна',
            linkGit: 'https://github.com/AnnaRabychina',
            avatar: 'https://annarabychina.github.io/rsschool-cv/img/avatar.jpg',
        },
        {
            name: 'Денис',
            linkGit: 'https://github.com/hokmyn',
            avatar: 'https://github.com/hokmyn/rsschool-cv/blob/rsschool-cv-html/img/photo.jpg?raw=true',
        },
        {
            name: 'Rs school',
            linkGit: 'https://rs.school/angular/',
            avatar: 'https://rs.school/images/rs_school_js.svg',
        },
    ];
}
