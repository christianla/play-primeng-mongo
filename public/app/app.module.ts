import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {AppComponent} from "./app.component";
import {InputTextModule, DataTableModule, ButtonModule, DialogModule, SharedModule} from "primeng/primeng";
import {CarService} from "./services/car.service";

import { HttpModule } from '@angular/http';


@NgModule({
  imports:      [ BrowserModule, FormsModule, InputTextModule, ButtonModule, HttpModule,DataTableModule,DialogModule, SharedModule ],
  declarations: [ AppComponent ],
  providers: [CarService],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
