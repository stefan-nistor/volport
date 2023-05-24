import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ToolbarComponent} from "./toolbar/toolbar.component";
import {SharedModule} from "../shared/shared.module";
import { RegisterFormComponent } from './register-form/register-form.component';
import { LoginFormComponent } from './login-form/login-form.component';



@NgModule({
  declarations: [ToolbarComponent, RegisterFormComponent, LoginFormComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [ToolbarComponent, RegisterFormComponent]
})
export class FeaturesModule { }
