import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@shared/material/material.module';
import { ListsShellComponent } from './container/lists-shell/lists-shell.component';
import { RouterModule, Routes } from '@angular/router';
import { TableListComponent } from './components/table-list/table-list.component';
import { BoardShellComponent } from './container/board-shell/board-shell.component';

const routes: Routes = [
    {
        path: '',
        component: ListsShellComponent,
    },
    {
        path: 'board/:id',
        component: BoardShellComponent,
    },
];

@NgModule({
    declarations: [ListsShellComponent, TableListComponent, BoardShellComponent],
    imports: [CommonModule, MaterialModule, RouterModule.forChild(routes)],
})
export class MainListModule {}
