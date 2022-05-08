import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardRoutingModule } from './board-routing.module';
import { BoardService } from './services/board.service';
import { ReactiveFormsModule } from '@angular/forms';
import { BoardShellComponent } from './containers/board-shell/board-shell.component';
import { MaterialModule } from '@shared/material/material.module';
import { ColumnComponent } from './components/column/column.component';

@NgModule({
    declarations: [BoardShellComponent, ColumnComponent],
    imports: [CommonModule, BoardRoutingModule, MaterialModule, ReactiveFormsModule],
    providers: [BoardService],
})
export class BoardModule {}
