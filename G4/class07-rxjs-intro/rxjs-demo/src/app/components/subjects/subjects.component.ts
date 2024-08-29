import {
  Component,
  DestroyRef,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { RxjsService } from '../../services/rxjs.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-subjects',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './subjects.component.html',
  styleUrl: './subjects.component.scss',
})
export class SubjectsComponent implements OnInit, OnDestroy {
  private rxjsService = inject(RxjsService);
  private destroyRef = inject(DestroyRef);

  fruitsSubject$ = this.rxjsService.fruitsSubject$;

  nameArray: string[] = [];

  nameValue: string;
  fruitValue: string;

  unsubscribe$ = new Subject();

  ngOnInit() {
    this.rxjsService.nameSubject$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => {
        console.log(value);
        this.nameArray = value;
      });

    this.rxjsService.nameSubject$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((value) => {
        console.log(value);
        this.nameArray = value;
      });

    this.rxjsService.getNames();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
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
