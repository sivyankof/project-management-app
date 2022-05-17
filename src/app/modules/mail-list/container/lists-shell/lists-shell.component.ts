import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MainService } from '@modules/mail-list/services/main.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '@shared/components/dialog/dialog.component';
import { map, take } from 'rxjs/operators';
import { IBoard } from '@shared/models/board-api-response.model';

@Component({
    selector: 'app-lists-shell',
    templateUrl: './lists-shell.component.html',
    styleUrls: ['./lists-shell.component.scss'],
    providers: [MainService],
})
export class ListsShellComponent implements OnInit {
    boards$: Observable<IBoard[]>;

    constructor(private mainService: MainService, private dialog: MatDialog) {}

    ngOnInit(): void {
        this.mainService.init();
        this.boards$ = this.mainService.getStateBoards();
    }

    onDeleteBoard(board: IBoard): void {
        const dialogRef = this.dialog.open(DialogComponent, {
            data: { nameItem: board.title },
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.mainService.deleteBoard(board.id);
            }
        });
    }

    //TODO need make popup info description
    onShowInfo(id: string): void {
        this.boards$
            .pipe(
                take(1),
                map((boards: IBoard[]) => {
                    return boards.find((board: IBoard) => board.id === id);
                }),
                map((board: IBoard) => board.description),
            )
            .subscribe((x) => console.log(x));
    }
}
