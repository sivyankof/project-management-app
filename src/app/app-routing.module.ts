import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from './core/auth-layout/auth-layout.component';
import { EditProfileComponent } from './core/components/edit-profile/edit-profile.component';
import { CreateNewBoardComponent } from './core/components/create-new-board/create-new-board.component';
import { AuthGuard } from '@service/guards/auth.guard';
import { NotFoundComponent } from './core/not-found/not-found.component';

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

            //TODO: Возможно нужно будет сделать из edit и create модули
            {
                path: 'edit-profile',
                component: EditProfileComponent,
            },
            {
                path: 'create-new-board',
                component: CreateNewBoardComponent,
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
