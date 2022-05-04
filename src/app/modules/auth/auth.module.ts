import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AuthService } from './services/auth.service';
import { MaterialModule } from '@shared/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [SignInComponent, SignUpComponent],
    imports: [CommonModule, AuthRoutingModule, MaterialModule, ReactiveFormsModule],
    providers: [AuthService],
})
export class AuthModule {}
