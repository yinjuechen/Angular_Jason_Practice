import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
    MatButtonModule,
    MatCardModule, MatCheckboxModule, MatDatepickerModule, MatExpansionModule,
    MatFormFieldModule, MatGridListModule,
    MatInputModule,
    MatListModule, MatNativeDateModule, MatPaginatorModule, MatProgressBarModule, MatRadioModule, MatRippleModule, MatSelectModule,
    MatSidenavModule, MatSliderModule, MatSnackBar, MatSnackBarModule, MatSortModule, MatStepperModule, MatTableModule,
    MatToolbarModule
} from '@angular/material';
import {ProfileComponent} from './profile/profile.component';
import {ApplicationComponent} from './application/application.component';
import {SidenavComponent} from './sidenav/sidenav.component';
import {LayoutModule} from '@angular/cdk/layout';
import {MessageComponent} from './message/message.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ProductsComponent} from './products/products.component';
import {ProductsHeaderComponent} from './products/products-header/products-header.component';
import {ProductOverviewComponent} from './products/product-overview/product-overview.component';
import {ProductsDetailComponent} from './products/product-detail/products-detail.component';
import {AddProductComponent} from './products/add-product/add-product.component';
import {TruckInfoComponent} from './products/truck-info/truck-info.component';
import {OrderAgentComponent} from './order-agent/order-agent.component';
import {OrderDetailComponent} from './order-detail/order-detail.component';
import {AdminComponent} from './admin/admin.component';
import {TruckAdminComponent} from './admin/truck-admin/truck-admin.component';
import {TruckdetailAdminComponent} from './admin/truck-admin/truckdetail-admin/truckdetail-admin.component';
import {TruckmodelAdminComponent} from './admin/truck-admin/truckmodel-admin/truckmodel-admin.component';
import {TruckreservationAdminComponent} from './admin/truck-admin/truckreservation-admin/truckreservation-admin.component';
import {FileUploadModule} from 'ng2-file-upload';
import {CloudinaryModule, CloudinaryConfiguration} from '@cloudinary/angular-5.x';
import {Cloudinary} from 'cloudinary-core';
import {DataAdminComponent} from './admin/data-admin/data-admin.component';
import {GoogleChartsModule} from 'angular-google-charts';
import {DailyDataComponent} from './admin/data-admin/daily-data/daily-data.component';
import {DailyModelComponent} from './admin/data-admin/daily-model/daily-model.component';
import {DataIncomeComponent} from './admin/data-admin/data-income/data-income.component';
import {MatGoogleMapsAutocompleteModule} from '@angular-material-extensions/google-maps-autocomplete';
import {AgmCoreModule} from '@agm/core';
import {CreditCardDirectivesModule} from 'angular-cc-library';
import {AngularFireModule} from '@angular/fire';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {SlideshowModule} from 'ng-simple-slideshow';
import {NgbCarouselModule} from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home/home.component';
import { OrderUserComponent } from './order-user/order-user.component';
import { OderDetailUserComponent } from './oder-detail-user/oder-detail-user.component';
import { PolicyComponent } from './policy/policy.component';


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
    TruckmodelAdminComponent,
    TruckreservationAdminComponent,
    DataAdminComponent,
    DailyDataComponent,
    DailyModelComponent,
    DataIncomeComponent,
    HomeComponent,
    OrderUserComponent,
    OderDetailUserComponent,
    PolicyComponent
  ],
  entryComponents: [
    TruckreservationAdminComponent,
    PolicyComponent
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
        MatRippleModule,
        FileUploadModule,
        CloudinaryModule.forRoot({Cloudinary}, {cloud_name: 'juechen'} as CloudinaryConfiguration),
        GoogleChartsModule,
        AgmCoreModule.forRoot({
            apiKey: '',
            libraries: ['places']
        }),
        MatGoogleMapsAutocompleteModule,
        CreditCardDirectivesModule,
        AngularFireModule.initializeApp({
            apiKey: '',
            authDomain: 'truck-rental-265020.firebaseapp.com',
            databaseURL: 'https://truck-rental-265020.firebasseio.com',
            projectId: 'truck-rental-265020',
            storageBucket: 'truck-rental-265020.appspot.com',
            messagingSenderId: '421015451291',
            appId: '1:421015451291:web:9def1485583d8c7113783e',
            measurementId: 'G-335KZJZ0JP'
        }),
        AngularFireStorageModule,
        MatProgressBarModule,
        SlideshowModule,
        NgbCarouselModule,
        MatRadioModule,
        MatSliderModule,
        MatSnackBarModule,
        MatStepperModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
