import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IBoard } from '@shared/models/board-api-response.model';

@Component({
    selector: 'app-table-list',
    templateUrl: './table-list.component.html',
    styleUrls: ['./table-list.component.scss'],
})
export class TableListComponent {
    @Input() boards: IBoard[];
    @Output() deleteBoard: EventEmitter<IBoard> = new EventEmitter<IBoard>();
    @Output() showInfo: EventEmitter<string> = new EventEmitter<string>();
}
