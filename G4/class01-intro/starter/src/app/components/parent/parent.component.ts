import { Component } from '@angular/core';
import { ChildComponent } from '../child/child.component';

@Component({
  selector: 'app-parent',
  standalone: true,
  imports: [ChildComponent],
  templateUrl: './parent.component.html',
  styleUrl: './parent.component.scss',
})
export class ParentComponent {
  parentTitle = 'I am coming from the parent!';
  childTitle = '';

  onTitleRecieve(output: string) {
    console.log('Title receieved called');
    this.childTitle = output;
  }
}
