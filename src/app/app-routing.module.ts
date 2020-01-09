import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ProfileComponent} from './profile/profile.component';
import {ApplicationComponent} from './application/application.component';
import {MessageComponent} from './message/message.component';
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {ProductsComponent} from './products/products.component';
import {ProductsDetailComponent} from './products/product-detail/products-detail.component';
import {AddProductComponent} from './products/add-product/add-product.component';
import {TruckInfoComponent} from './products/truck-info/truck-info.component';
import {OrderAgentComponent} from './order-agent/order-agent.component';
import {OrderDetailComponent} from './order-detail/order-detail.component';
import {AdminComponent} from './admin/admin.component';
import {TruckAdminComponent} from './admin/truck-admin/truck-admin.component';
import {TruckdetailAdminComponent} from './admin/truck-admin/truckdetail-admin/truckdetail-admin.component';
import {TruckmodelAdminComponent} from './admin/truck-admin/truckmodel-admin/truckmodel-admin.component';


const routes: Routes = [
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'application',
    component: ApplicationComponent
  },
  {
    path: 'message',
    component: MessageComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'trucks',
    component: ProductsComponent
  },
  {
    path: 'trucks/:id',
    component: ProductsDetailComponent
  },
  {
    path: 'add-truck',
    component: AddProductComponent
  },
  {
    path: 'truckinfo',
    component: TruckInfoComponent
  },
  {
    path: 'orders',
    component: OrderAgentComponent
  },
  {
    path: 'orders/:id',
    component: OrderDetailComponent
  },
  {
    path: 'admin',
    component: AdminComponent
  },
  {
    path: 'admin/trucks',
    component: TruckAdminComponent
  },
  {
    path: 'admin/trucks/truckdetai/:id',
    component: TruckdetailAdminComponent
  },
  {
    path: 'admin/trucks/truckmodel/:id',
    component: TruckmodelAdminComponent
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
