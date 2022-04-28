import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {HeaderComponent} from "./core/header/header.component";

const routes: Routes = [{
  path: "",
  component: HeaderComponent,
  //TODO need to add guard
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
