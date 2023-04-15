import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from "@angular/router";

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NavBarComponent } from './shared/nav-bar/nav-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from "./app-routing.module";
import {MatIconModule} from "@angular/material/icon";
import { LoginComponent } from './dialogs/login/login.component';
import {MatDialogModule} from "@angular/material/dialog";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ProductsComponent } from './pages/products/products.component';
import {LoadingComponent} from "./shared/loading/loading.component";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { FooterComponent } from './shared/footer/footer.component';
import {MatButtonModule} from "@angular/material/button";
import {DeleteDialogComponent} from "./dialogs/delete-dialog/delete-dialog.component";
import { CreateDialogComponent } from './dialogs/create-dialog/create-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    LoginComponent,
    ProductsComponent,
    LoadingComponent,
    FooterComponent,
    DeleteDialogComponent,
    CreateDialogComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatIconModule,
    MatDialogModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
