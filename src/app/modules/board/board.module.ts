import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardRoutingModule } from './board-routing.module';
import { BoardComponent } from './components/board/board.component';
import { BoardService } from './services/board.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [BoardComponent],
    imports: [CommonModule, BoardRoutingModule, FormBuilder, ReactiveFormsModule],
    providers: [BoardService],
})
export class BoardModule {}
