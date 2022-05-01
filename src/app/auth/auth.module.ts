import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignUpPageComponent } from './pages/sign-up-page/sign-up-page.component';
import { SignInPageComponent } from './pages/sign-in-page/sign-in-page.component';
import { AuthService } from './services/auth.service';

@NgModule({
    declarations: [SignInComponent, SignUpComponent, SignUpPageComponent, SignInPageComponent],
    imports: [CommonModule, AuthRoutingModule],
    providers: [AuthService],
})
export class AuthModule {}
