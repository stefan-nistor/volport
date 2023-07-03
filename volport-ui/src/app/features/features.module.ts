import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ToolbarComponent} from "./toolbar/toolbar.component";
import {SharedModule} from "../shared/shared.module";
import { RegisterFormComponent } from './register-form/register-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { DepartmentsComponent } from './departments/departments.component';
import { ProjectsComponent } from './projects/projects.component';
import { VolunteersComponent } from './volunteers/volunteers.component';
import { EventsComponent } from './events/events.component';
import { ProfileComponent } from './profile/profile.component';



@NgModule({
  declarations: [ToolbarComponent, RegisterFormComponent, LoginFormComponent, WelcomePageComponent, DepartmentsComponent, ProjectsComponent, VolunteersComponent, EventsComponent, ProfileComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [ToolbarComponent, RegisterFormComponent]
})
export class FeaturesModule { }
