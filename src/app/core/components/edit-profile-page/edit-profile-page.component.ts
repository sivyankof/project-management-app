import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ISignUp } from '@modules/auth/models/auth';
import { SnackBarService } from '@service/snack-bar.service';
import { UserService } from '@service/user.service';
import { DialogComponent } from '@shared/components/dialog/dialog.component';
import { IUser } from '@shared/models/user.model';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-edit-profile-page',
    templateUrl: './edit-profile-page.component.html',
    styleUrls: ['./edit-profile-page.component.scss'],
    providers: [UserService],
})
export class EditProfilePageComponent implements OnInit {
    user$: Observable<IUser>;

    constructor(
        private userService: UserService,
        private dialog: MatDialog,
        private router: Router,
        private snackBarService: SnackBarService,
    ) {}

    ngOnInit(): void {
        this.userService.initCurrentUser();
        this.user$ = this.userService.getCurrentUser();
    }

    onEditUser(form: ISignUp): void {
        this.userService.updateUser(form);
        history.back();
    }

    onDeleteUser(user: IUser): void {
        const dialogRef = this.dialog.open(DialogComponent, {
            data: { nameItem: user.login },
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.userService.deleteUser(user.id);
                localStorage.clear();
                this.router.navigate(['auth']);
                this.snackBarService.openSnackBar(
                    $localize`:snackBarMsg@@snackBarMsg: User "${user.login}" was deleted`,
                );
            }
        });
    }
}
