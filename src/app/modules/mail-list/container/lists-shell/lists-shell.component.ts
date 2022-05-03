import { Component, OnInit } from '@angular/core';
import { DataService } from '@service/data.service';
import { IBoardList } from '@shared/models/board-list.interface';
import { take } from 'rxjs/operators';

@Component({
    selector: 'app-lists-shell',
    templateUrl: './lists-shell.component.html',
    styleUrls: ['./lists-shell.component.scss'],
})
export class ListsShellComponent implements OnInit {
    data: IBoardList[];

    isLoading = false;

    constructor(private dataService: DataService) {}

    ngOnInit(): void {
        this.isLoading = true;

        this.dataService
            .getListItems()
            .pipe(take(1))
            .subscribe((value) => {
                this.data = value;
                this.isLoading = false;
            });
    }
}
