import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BoardService } from '@modules/board/services/board.service';
import { CreateNewBoardPopupComponent } from '../components/create-new-board-popup/create-new-board-popup.component';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    providers: [BoardService],
})
export class HeaderComponent {
    public links = [
        {
            icon: 'home',
            name: 'Home',
            route: 'list',
        },
        {
            icon: 'edit',
            name: 'Edit profile',
            route: 'edit-profile',
        },
    ];

    constructor(
        private router: Router,
        private dialogRef: MatDialog,
        private boardService: BoardService,
    ) {}

    logOut(): void {
        localStorage.clear();
        this.router.navigate(['auth']);
    }

    openDialog(): void {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.maxWidth = '450px';
        dialogConfig.width = '100%';
        const dialog = this.dialogRef.open(CreateNewBoardPopupComponent, dialogConfig);
        dialog.afterClosed().subscribe((title) => this.boardService.addBoard(title));
    }
}
