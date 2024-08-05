import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-binding',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './binding.component.html',
  styleUrl: './binding.component.css'
})
export class BindingComponent {
  name: string = 'John Doe';
  age: number = 1;
  isAdult: boolean = false;

  handleNameChange(event: any) {
    console.log(event.target.value)
    this.name = event.target.value
    // this.name = 'Mr.' + event.target.value
  }
}
