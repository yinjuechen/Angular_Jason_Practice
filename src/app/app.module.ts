import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCardModule, MatCheckboxModule, MatDatepickerModule, MatExpansionModule,
  MatFormFieldModule, MatGridListModule,
  MatInputModule,
  MatListModule, MatNativeDateModule, MatPaginatorModule, MatRippleModule, MatSelectModule,
  MatSidenavModule, MatSortModule, MatTableModule,
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
import { TruckInfoComponent } from './products/truck-info/truck-info.component';
import { OrderAgentComponent } from './order-agent/order-agent.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { AdminComponent } from './admin/admin.component';
import { TruckAdminComponent } from './admin/truck-admin/truck-admin.component';
import { TruckdetailAdminComponent } from './admin/truck-admin/truckdetail-admin/truckdetail-admin.component';
import { TruckmodelAdminComponent } from './admin/truck-admin/truckmodel-admin/truckmodel-admin.component';







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
    TruckInfoComponent,
    OrderAgentComponent,
    OrderDetailComponent,
    AdminComponent,
    TruckAdminComponent,
    TruckdetailAdminComponent,
    TruckmodelAdminComponent
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
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatGridListModule,
    MatCheckboxModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatExpansionModule,
    MatRippleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
