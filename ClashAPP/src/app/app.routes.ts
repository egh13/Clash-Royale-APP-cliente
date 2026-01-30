import { Routes } from '@angular/router';
import { IndexComponent } from './components/index/index.component';
import { Login } from './components/login/login';
import { MazosComponent } from './components/mazos/mazos.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { User } from './components/user/user';
import { CardCatalogComponent } from './components/card-catalog/card-catalog.component';
import { Register } from './components/register/register';
import { authGuard } from './guards/auth-guard';


export const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
  },
  {
    path: 'login',
    component: Login,
  },
  {
    path: 'register',
    component: Register,
  },
  {
    path: 'mazos',
    component: MazosComponent,
    canActivate: [authGuard]
  },
  {
    path: 'quiz',
    component: QuizComponent,
    canActivate: [authGuard]
  },
  {
    path: 'user/:id',
    component: User,
  },
  { path: 'cards', component: CardCatalogComponent },
];
