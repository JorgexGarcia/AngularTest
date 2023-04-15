import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from "@angular/material/icon";
import { MatDialogModule } from "@angular/material/dialog";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatButtonModule } from "@angular/material/button";
import { MatPaginatorIntl, MatPaginatorModule } from "@angular/material/paginator";

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NavBarComponent } from './shared/nav-bar/nav-bar.component';
import { AppRoutingModule } from "./app-routing.module";
import { LoginComponent } from './dialogs/login/login.component';
import { ProductsComponent } from './pages/products/products.component';
import { LoadingComponent } from "./shared/loading/loading.component";
import { FooterComponent } from './shared/footer/footer.component';
import { DeleteDialogComponent } from "./dialogs/delete-dialog/delete-dialog.component";
import { CreateDialogComponent } from './dialogs/create-dialog/create-dialog.component';
import { MatPaginatorIntlCro } from "./shared/providers/custom-mat-paginator";
import { EuroPipe } from './pipes/euro.pipe';

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
    CreateDialogComponent,
    EuroPipe
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
    MatPaginatorModule,
  ],
  providers: [{ provide: MatPaginatorIntl, useClass: MatPaginatorIntlCro}],
  bootstrap: [AppComponent]
})
export class AppModule { }
