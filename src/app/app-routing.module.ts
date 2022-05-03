import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from './core/auth-layout/auth-layout.component';
import { EditProfileComponent } from './core/components/edit-profile/edit-profile.component';
import { CreateNewBoardComponent } from './core/components/create-new-board/create-new-board.component';

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
                path: 'auth',
                loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
            },
            // {
            //TODO need crate main module
            // path: '',

            // loadChildren: () =>
            //     import('@modules/dashboard/dashboard.module').then((m) => m.DashboardModule),
            // },
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
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
