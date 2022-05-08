import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { BoardService } from '@modules/board/services/board.service';
import { IBoardApiResponse, IColumnsApiResponse } from '@shared/models/board-api-response.model';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '@shared/components/dialog/dialog.component';

@Component({
    selector: 'app-board-shell',
    templateUrl: './board-shell.component.html',
    styleUrls: ['./board-shell.component.scss'],
    providers: [BoardService],
})
export class BoardShellComponent implements OnInit {
    public boards$: Observable<IBoardApiResponse>;

    constructor(
        private route: ActivatedRoute,
        private boardService: BoardService,
        private dialog: MatDialog,
    ) {}

    ngOnInit(): void {
        // Получаем id из url и загружаем стейт
        this.route.queryParams.subscribe((params: Params) => {
            this.boardService.initBoards(params.id);

            this.boards$ = this.boardService.getBoards();
        });
    }

    addColumn(): void {
        //TODO нужно сделать попап

        this.boardService.addColumn('qweqweqwe');
    }

    onDeleteColumn(column: IColumnsApiResponse): void {
        const dialogRef = this.dialog.open(DialogComponent, {
            data: {
                nameItem: column.title,
            },
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.boardService.deleteColumn(column.id);
            }
        });
    }
}
