import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@shared/material/material.module';
import { ListsShellComponent } from './container/lists-shell/lists-shell.component';
import { RouterModule, Routes } from '@angular/router';
import { TableListComponent } from './components/table-list/table-list.component';
import { SharedModule } from '@shared/shared.module';

const routes: Routes = [
    {
        path: '',
        component: ListsShellComponent,
    },
];

@NgModule({
    declarations: [ListsShellComponent, TableListComponent],
    imports: [CommonModule, MaterialModule, RouterModule.forChild(routes), SharedModule],
})
export class MainListModule {}
