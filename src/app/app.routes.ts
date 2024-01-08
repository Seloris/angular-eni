import { Routes } from '@angular/router';
import { KanbanComponent } from './features/kanban/kanban.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'kanban',
  },
  { path: 'kanban', component: KanbanComponent },
];
