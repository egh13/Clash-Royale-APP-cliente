import { Routes } from '@angular/router';
import { IndexComponent } from './components/index/index.component';
import { Login } from './components/login/login';
import { MazosComponent } from './components/mazos/mazos.component';
import { QuizComponent } from './components/quiz/quiz.component';

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
    path: 'quiz',
    component: QuizComponent,
  },
];
