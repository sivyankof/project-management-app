import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogComponent } from '@shared/components/dialog/dialog.component';
import { MaterialModule } from '@shared/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [DialogComponent],
    imports: [CommonModule, MaterialModule, ReactiveFormsModule],
    exports: [DialogComponent],
})
export class SharedModule {}
