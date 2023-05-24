import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {SharedModule} from "./shared/shared.module";
import {FeaturesModule} from "./features/features.module";
import {RouterModule} from "@angular/router";
import {AppRoutingModule} from "./app-routing.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    SharedModule,
    FeaturesModule,
    RouterModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
