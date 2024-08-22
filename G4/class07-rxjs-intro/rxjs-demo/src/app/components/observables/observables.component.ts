import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, effect, OnDestroy, OnInit } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { from, interval, Observable, of, Subscription } from 'rxjs';

@Component({
  selector: 'app-observables',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './observables.component.html',
  styleUrl: './observables.component.scss',
})
export class ObservablesComponent implements OnInit, OnDestroy {
  numArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  //From takes an array and emits every element individually
  fromObs$ = from(this.numArray);

  //Of takes in arguments and emits them one by one
  ofObs$ = of(this.numArray, 'borche', 100, false);

  //Manual Observable
  numberEmitterObs$ = new Observable((subscriber) => {
    subscriber.next(1);
    subscriber.next(2);
    subscriber.next(3);
    subscriber.next(4);
    subscriber.next(5);
    subscriber.error('somethign went wrong');
    subscriber.next(6);
    subscriber.next(7);
    subscriber.next(8);
    subscriber.next(9);
    subscriber.next(10);
    subscriber.complete();
  });

  intervalObs$ = interval(1000);

  intervalSubscription: Subscription;

  intervalAsyncObs$ = interval(500);

  intervalSignal = toSignal(this.intervalAsyncObs$);

  constructor() {
    effect(() => {
      console.log('effect', this.intervalSignal());
    });
  }

  ngOnInit(): void {
    // this.fromObs$.subscribe({
    //   next: (value) => {
    //     console.log('from the from obs', value);
    //   },
    //   error: (err) => {
    //     console.log(err);
    //   },
    //   complete: () => {
    //     console.log('from observable completed');
    //   },
    // });
    // this.ofObs$.subscribe((value) => {
    //   console.log('in the of callback', value);
    // });
    this.numberEmitterObs$.subscribe({
      next: (value) => console.log('manual obs', value),
      //When an error is thrown the observables stops emitting and is completed
      error: (err) => console.log('error callback', err),
      // If the observable is cold the completed callback will be called otherwise it will remaining open and it can cause memory leaks
      complete: () => console.log('completed'),
    });

    this.intervalSubscription = this.intervalObs$.subscribe({
      next: (value) => {
        console.log('interval obs', value);
      },
      complete: () => console.log('interval completed'),
    });
  }

  ngOnDestroy(): void {
    this.intervalSubscription.unsubscribe();
  }
}
