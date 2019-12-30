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
    path: 'products',
    component: ProductsComponent
  },
  {
    path: 'products/:id',
    component: ProductsDetailComponent
  },
  {
    path: 'add-product',
    component: AddProductComponent
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
