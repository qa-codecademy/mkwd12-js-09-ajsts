import { Routes } from '@angular/router';
import { ObservablesComponent } from './components/observables/observables.component';
import { SubjectsComponent } from './components/subjects/subjects.component';
import { OperatorsComponent } from './components/operators/operators.component';

export const routes: Routes = [
  {
    path: 'observables',
    component: ObservablesComponent,
  },
  {
    path: 'subjects',
    component: SubjectsComponent,
  },
  {
    path: 'operators',
    component: OperatorsComponent,
  },
];
