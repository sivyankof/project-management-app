import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IBoard } from '@shared/models/board-list.interface';

@Component({
    selector: 'app-table-list',
    templateUrl: './table-list.component.html',
    styleUrls: ['./table-list.component.scss'],
})
export class TableListComponent {
    @Input() boards: IBoard[];
    @Output() deleteBoard: EventEmitter<IBoard> = new EventEmitter<IBoard>();

    showInfo(id: string): void {
        //TODO need to do preview

        console.log(id);
    }

    onDeleteBoard(board: IBoard): void {
        this.deleteBoard.emit(board);
    }
}
