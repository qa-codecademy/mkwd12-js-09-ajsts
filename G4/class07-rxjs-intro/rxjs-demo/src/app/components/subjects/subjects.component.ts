import { Component, inject } from '@angular/core';
import { RxjsService } from '../../services/rxjs.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-subjects',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './subjects.component.html',
  styleUrl: './subjects.component.scss',
})
export class SubjectsComponent {
  private rxjsService = inject(RxjsService);

  fruitsSubject$ = this.rxjsService.fruitsSubject$;

  nameArray: string[] = [];

  nameValue: string;
  fruitValue: string;

  ngOnInit() {
    this.rxjsService.nameSubject$.subscribe((value) => {
      console.log(value);
      this.nameArray = value;
    });

    this.rxjsService.getNames();
  }

  onAddNameClick() {
    if (!this.nameValue) return;

    this.rxjsService.addName(this.nameValue);
  }

  onAddFruitClick() {
    if (!this.fruitValue) return;

    this.rxjsService.addFruit(this.fruitValue);
  }
}
