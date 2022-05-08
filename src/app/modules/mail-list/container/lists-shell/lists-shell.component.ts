import { Component, OnDestroy, OnInit } from '@angular/core';
import { IBoard } from '@shared/models/board-list.interface';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MainService } from '@modules/mail-list/services/main.service';

@Component({
    selector: 'app-lists-shell',
    templateUrl: './lists-shell.component.html',
    styleUrls: ['./lists-shell.component.scss'],
})
export class ListsShellComponent implements OnInit, OnDestroy {
    boards: IBoard[];
    isLoading = false;
    private destroy$ = new Subject();

    constructor(private mainService: MainService) {}

    ngOnInit(): void {
        this.isLoading = true;

        this.mainService
            .getListItems()
            .pipe(takeUntil(this.destroy$))
            .subscribe((boards) => {
                this.boards = boards;
                this.isLoading = false;
            });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
