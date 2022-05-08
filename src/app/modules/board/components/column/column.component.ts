import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IColumnsApiResponse } from '@shared/models/board-api-response.model';

@Component({
    selector: 'app-column',
    templateUrl: './column.component.html',
    styleUrls: ['./column.component.scss'],
})
export class ColumnComponent {
    @Input() column: IColumnsApiResponse;
    @Input() index: number;

    @Output() deleteColumn: EventEmitter<IColumnsApiResponse> =
        new EventEmitter<IColumnsApiResponse>(null);

    onDeleteColumn(column: IColumnsApiResponse): void {
        this.deleteColumn.emit(column);
    }
}
