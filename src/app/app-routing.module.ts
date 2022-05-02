import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from './core/auth-layout/auth-layout.component';
import { EditProfileComponent } from './core/components/edit-profile/edit-profile.component';
import { CreateNewBoardComponent } from './core/components/create-new-board/create-new-board.component';
import { NotFoundComponent } from './core/not-found/not-found.component';

const routes: Routes = [
    {
        path: '',
        component: AuthLayoutComponent,
        children: [
            {
                path: '',
                redirectTo: 'main-list',
                pathMatch: 'full',
            },
            {
                path: 'main-list',
                loadChildren: () =>
                    import('@modules/mail-list/main-list.module').then((m) => m.MainListModule),
            },
            {
                path: 'edit-profile',
                component: EditProfileComponent,
            },
            {
                path: 'create-new-board',
                component: CreateNewBoardComponent,
            },
            {
                path: '**',
                component: NotFoundComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
