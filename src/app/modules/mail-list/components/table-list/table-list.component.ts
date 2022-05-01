import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { IBoardList } from '../../../../shared/models/board-list.interface';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
    selector: 'app-table-list',
    templateUrl: './table-list.component.html',
    styleUrls: ['./table-list.component.scss'],
})
export class TableListComponent implements AfterViewInit {
    @ViewChild(MatSort) sort: MatSort;

    @Input() list: IBoardList[];

    displayedColumns: string[] = ['position', 'title', 'description', 'author', 'date'];

    dataSource = new MatTableDataSource([]);

    ngAfterViewInit(): void {
        this.dataSource = new MatTableDataSource(this.list);
        this.dataSource.sort = this.sort;
    }
}
