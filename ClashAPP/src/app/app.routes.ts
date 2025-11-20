import { Routes } from '@angular/router';
import { IndexComponent } from './components/index/index.component';
import { Login } from './components/login/login';

export const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
  },
  {
    path: 'login',
    component: Login,
  },
];
