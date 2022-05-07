import { Component, Input } from '@angular/core';
import { IBoard } from '@shared/models/board-list.interface';

@Component({
    selector: 'app-table-list',
    templateUrl: './table-list.component.html',
    styleUrls: ['./table-list.component.scss'],
})
export class TableListComponent {
    @Input() boards: IBoard[];

    showInfo(id: string): void {
        //TODO need to do preview

        console.log(id);
    }
}
