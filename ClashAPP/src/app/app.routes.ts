import { Routes } from '@angular/router';
import { IndexComponent } from './components/index.component/index.component';
import { QuizComponent } from './quiz/quiz.component';

export const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
  },
  {
    path: 'quiz',
    component: QuizComponent,
  },

];
