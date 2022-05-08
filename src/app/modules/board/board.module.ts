import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardRoutingModule } from './board-routing.module';
import { BoardService } from './services/board.service';
import { ReactiveFormsModule } from '@angular/forms';
import { BoardShellComponent } from './containers/board-shell/board-shell.component';
import { MaterialModule } from '@shared/material/material.module';
import { ColumnComponent } from './components/column/column.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
    declarations: [BoardShellComponent, ColumnComponent],
    imports: [CommonModule, BoardRoutingModule, MaterialModule, SharedModule, ReactiveFormsModule],
    providers: [BoardService],
})
export class BoardModule {}
