import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardShellComponent } from '@modules/board/containers/board-shell/board-shell.component';

const routes: Routes = [{ path: '', component: BoardShellComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class BoardRoutingModule {}
