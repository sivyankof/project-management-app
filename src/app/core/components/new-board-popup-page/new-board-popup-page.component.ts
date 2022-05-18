import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BoardService } from '@modules/board/services/board.service';
import { CreateNewBoardPopupComponent } from '../create-new-board-popup/create-new-board-popup.component';
import { take } from 'rxjs/operators';
import { SnackBarService } from '@service/snack-bar.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-new-board-popup-page',
    templateUrl: './new-board-popup-page.component.html',
    styleUrls: ['./new-board-popup-page.component.scss'],
    providers: [BoardService],
})
export class NewBoardPopupPageComponent {
    constructor(
        public dialog: MatDialog,
        private router: Router,
        private boardService: BoardService,
        private snack: SnackBarService,
    ) {
        this.openDialog();
    }

    openDialog(): void {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.maxWidth = '450px';
        dialogConfig.width = '100%';
        const dialog = this.dialog.open(CreateNewBoardPopupComponent, dialogConfig);
        dialog.afterClosed().subscribe((newBoard) => {
            if (newBoard) {
                this.boardService
                    .addBoard(newBoard)
                    .pipe(take(1))
                    .subscribe(
                        (res) => {
                            this.snack.openSnackBar(`Board "${res.title}" was created`);
                            this.router.navigate(['main', 'list']);
                        },
                        (error: HttpErrorResponse) => {
                            this.snack.openSnackBar(error.message);
                            this.router.navigate(['main', 'list']);
                        },
                    );
            }
        });
    }
}
