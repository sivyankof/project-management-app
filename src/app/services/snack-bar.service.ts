import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable()
export class SnackBarService {
    private readonly config: MatSnackBarConfig;

    constructor(private snackBar: MatSnackBar) {
        this.config = new MatSnackBarConfig();
    }

    public openSnackBar(message: string): void {
        this.config.verticalPosition = 'top';
        this.config.horizontalPosition = 'right';
        this.config.duration = 1000;
        this.snackBar.open(message, null, this.config);
    }
}
