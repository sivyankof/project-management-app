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
import { CreateNewBoardPopupComponent } from './core/components/create-new-board-popup/create-new-board-popup.component';
import { HttpService } from '@service/http/http.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from '@service/interceptors/auth.interceptor';
import { WelcomePageComponent } from './core/welcome-page/welcome-page.component';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SnackBarService } from '@service/snack-bar.service';
import { NewBoardPopupPageComponent } from './core/components/new-board-popup-page/new-board-popup-page.component';
import { EditProfilePageComponent } from './core/components/edit-profile-page/edit-profile-page.component';
import { StickyHeaderDirective } from '@shared/directives/sticky-header.directive';

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
        NewBoardPopupPageComponent,
        EditProfilePageComponent,
        StickyHeaderDirective,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MaterialModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
    ],
    providers: [
        SnackBarService,
        HttpService,
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
