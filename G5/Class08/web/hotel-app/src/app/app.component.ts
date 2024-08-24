import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RxjsOperatorsComponent } from './components/rxjs-operators/rxjs-operators.component';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RxjsOperatorsComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {}
