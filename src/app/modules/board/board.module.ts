import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardRoutingModule } from './board-routing.module';
import { BoardComponent } from './components/board/board.component';
import { BoardService } from './services/board.service';

@NgModule({
    declarations: [BoardComponent],
    imports: [CommonModule, BoardRoutingModule],
    providers: [BoardService],
})
export class BoardModule {}
