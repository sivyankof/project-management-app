import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from './core/auth-layout/auth-layout.component';
import { AuthGuard } from '@service/guards/auth.guard';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { NewBoardPopupPageComponent } from './core/components/new-board-popup-page/new-board-popup-page.component';
import { EditProfilePageComponent } from './core/components/edit-profile-page/edit-profile-page.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'auth',
        pathMatch: 'full',
    },
    {
        path: 'auth',
        loadChildren: () => import('./modules/auth/auth.module').then((m) => m.AuthModule),
    },
    {
        path: 'main',
        component: AuthLayoutComponent,
        canActivateChild: [AuthGuard],
        children: [
            {
                path: '',
                redirectTo: 'list',
                pathMatch: 'full',
            },
            {
                path: 'list',
                loadChildren: () =>
                    import('@modules/mail-list/main-list.module').then((m) => m.MainListModule),
            },

            {
                path: 'board',
                loadChildren: () =>
                    import('@modules/board/board.module').then((m) => m.BoardModule),
            },
            {
                path: 'edit-profile',
                component: EditProfilePageComponent,
            },
            {
                path: 'create-new-board',
                component: NewBoardPopupPageComponent,
            },
        ],
    },
    {
        path: '**',
        component: NotFoundComponent,
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
