import { Routes } from '@angular/router';
import { IndexComponent } from './components/index/index.component';
import { Login } from './components/login/login';
import { QuizComponent } from './components/quiz/quiz.component';
import { User } from './components/user/user';
import { CardCatalogComponent } from './components/card-catalog.component/card-catalog.component';

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
    path: 'quiz',
    component: QuizComponent,
  },
  {
    path: 'user/:id',
    component: User,
  },
  { path: 'cards', component: CardCatalogComponent },
];
