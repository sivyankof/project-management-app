import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@shared/material/material.module';
import { AuthLayoutComponent } from './core/auth-layout/auth-layout.component';
import { EditProfileComponent } from './core/components/edit-profile/edit-profile.component';
import { DataService } from '@service/data.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from '@service/auth.interceptor';
import { WelcomePageComponent } from './core/welcome-page/welcome-page.component';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { BoardService } from '@modules/board/services/board.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateNewBoardPopupComponent } from './core/components/create-new-board-popup/create-new-board-popup.component';
import { SnackBarService } from '@service/snack-bar.service';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        AuthLayoutComponent,
        EditProfileComponent,
        CreateNewBoardPopupComponent,
        WelcomePageComponent,
        NotFoundComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MaterialModule,
        HttpClientModule,
        ReactiveFormsModule,
    ],
    providers: [
        BoardService,
        DataService,
        SnackBarService,
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
