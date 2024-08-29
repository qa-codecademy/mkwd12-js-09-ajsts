import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TemplateFormComponent } from './components/template-form/template-form.component';
import { ReactiveFormComponent } from './components/reactive-form/reactive-form.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    TemplateFormComponent,
    ReactiveFormComponent,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  showTemplateForm = signal(true);

  toggleForm() {
    this.showTemplateForm.update((prevValue) => !prevValue);
  }
}
