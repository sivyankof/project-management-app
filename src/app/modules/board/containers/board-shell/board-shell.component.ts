import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { BoardService } from '@modules/board/services/board.service';
import { IBoardApiResponse } from '@shared/models/board-api-response.model';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-board-shell',
    templateUrl: './board-shell.component.html',
    styleUrls: ['./board-shell.component.scss'],
    providers: [BoardService],
})
export class BoardShellComponent implements OnInit, OnDestroy {
    public boards$: Observable<IBoardApiResponse>;

    constructor(private route: ActivatedRoute, private boardService: BoardService) {}

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

    ngOnDestroy(): void {
        this.boardService.destroyBoard();
    }
}
