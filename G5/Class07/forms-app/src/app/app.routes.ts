import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TemplateComponent } from './components/template/template.component';
import { ReactiveComponent } from './components/reactive/reactive.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'template', component: TemplateComponent },
  { path: 'reactive', component: ReactiveComponent },
];
