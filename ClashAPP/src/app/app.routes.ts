import { Routes } from '@angular/router';
import { IndexComponent } from './index.component/index.component';
import { MazosComponent } from './mazos.component/mazos.component';


export const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
  },
  {
    path: 'mazos',
    title: 'Recomendar Mazos',
    component: MazosComponent,
  }

];  
