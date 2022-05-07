import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from '@service/data.service';
import { IBoard } from '@shared/models/board-list.interface';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-lists-shell',
    templateUrl: './lists-shell.component.html',
    styleUrls: ['./lists-shell.component.scss'],
})
export class ListsShellComponent implements OnInit, OnDestroy {
    boards: IBoard[];
    isLoading = false;
    private destroy$ = new Subject();

    constructor(private dataService: DataService) {}

    ngOnInit(): void {
        this.isLoading = true;

        this.dataService
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
