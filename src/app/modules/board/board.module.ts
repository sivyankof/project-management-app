import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardRoutingModule } from './board-routing.module';
import { BoardService } from './services/board.service';
import { BoardShellComponent } from './containers/board-shell/board-shell.component';
import { MaterialModule } from '@shared/material/material.module';
import { ColumnComponent } from './components/column/column.component';
import { SharedModule } from '@shared/shared.module';
import { CreateTaskFormComponent } from './components/create-task-form/create-task-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaskComponent } from './components/task/task.component';
import { TaskInfoPopupShellComponent } from './containers/task-info-popup-shell/task-info-popup-shell.component';

@NgModule({
    declarations: [
        BoardShellComponent,
        ColumnComponent,
        CreateTaskFormComponent,
        TaskComponent,
        TaskInfoPopupShellComponent,
    ],

    imports: [
        CommonModule,
        BoardRoutingModule,
        MaterialModule,
        SharedModule,
        ReactiveFormsModule,
        FormsModule,
    ],
    providers: [BoardService],
})
export class BoardModule {}
