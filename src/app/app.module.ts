import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatListModule, MatSelectModule,
  MatSidenavModule,
  MatToolbarModule
} from '@angular/material';
import { ProfileComponent } from './profile/profile.component';
import { ApplicationComponent } from './application/application.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MessageComponent } from './message/message.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {FlexLayoutModule} from '@angular/flex-layout';
import { ProductsComponent } from './products/products.component';
import { ProductsHeaderComponent } from './products/products-header/products-header.component';
import { ProductOverviewComponent } from './products/product-overview/product-overview.component';
import { ProductsDetailComponent } from './products/product-detail/products-detail.component';
import { AddProductComponent } from './products/add-product/add-product.component';




@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    ApplicationComponent,
    SidenavComponent,
    MessageComponent,
    LoginComponent,
    RegisterComponent,
    ProductsComponent,
    ProductsHeaderComponent,
    ProductOverviewComponent,
    ProductsDetailComponent,
    AddProductComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    LayoutModule,
    FormsModule,
    MatCardModule,
    HttpClientModule,
    MatFormFieldModule,
    MatListModule,
    MatInputModule,
    MatButtonModule,
    FlexLayoutModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
