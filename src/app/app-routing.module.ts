import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ProfileComponent} from './profile/profile.component';
import {ApplicationComponent} from './application/application.component';
import {MessageComponent} from './message/message.component';
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';


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
