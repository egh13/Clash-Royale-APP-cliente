import { Routes } from '@angular/router';
import { IndexComponent } from './components/index/index.component';
import { Login } from './components/login/login';
import { MazosComponent } from './components/mazos/mazos.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { User } from './components/user/user';
import { CardCatalogComponent } from './components/card-catalog/card-catalog.component';
import { Register } from './components/register/register';

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
    path: 'mazos',
    component: MazosComponent,
  },
  {
    path: 'register',
    component: Register,
  },
  {
    path: 'quiz',
    component: QuizComponent,
  },
  {
    path: 'user/:id',
    component: User,
  },
  { path: 'cards', component: CardCatalogComponent },
];
