import {Component, NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RegisterFormComponent} from "./features/register-form/register-form.component";
import {WelcomePageComponent} from "./features/welcome-page/welcome-page.component";
import {DepartmentsComponent} from "./features/departments/departments.component";
import {ProjectsComponent} from "./features/projects/projects.component";
import {VolunteersComponent} from "./features/volunteers/volunteers.component";
import {EventsComponent} from "./features/events/events.component";
import {ProfileComponent} from "./features/profile/profile.component";
import {LoginFormComponent} from "./features/login-form/login-form.component";

const routes: Routes = [
  {
    path:'',
    redirectTo: 'dashboard',
    pathMatch: "full"
  },
  {
    path:'register',
    component: RegisterFormComponent
  },
  {
    path:'login',
    component: LoginFormComponent
  },
  {
    path: 'dashboard',
    component: WelcomePageComponent
  },
  {
    path:'department',
    component: DepartmentsComponent
  },
  {
    path:'project',
    component: ProjectsComponent
  },
  {
    path:'volunteer',
    component: VolunteersComponent
  },
  {
    path:'event',
    component: EventsComponent
  },
  {
    path:'profile',
    component: ProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
