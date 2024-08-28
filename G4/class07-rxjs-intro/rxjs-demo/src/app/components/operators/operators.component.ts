import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, from, map, of, skip, take, takeLast, tap } from 'rxjs';

@Component({
  selector: 'app-operators',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './operators.component.html',
  styleUrl: './operators.component.scss',
})
export class OperatorsComponent {
  usernames = [
    'Janko',
    'Petko',
    'Stanko',
    'Lazar',
    'Krsto',
    'Stojan',
    'Blazhe',
    'Laste',
    'Ratko',
    'Sveto',
    'Risto',
    'Mile',
    'Boris',
    'Slavko',
    'Stefan',
    'Stamencho',
  ];

  //Operators can be added to observables like so before we subscribe to them using the async pipe in the template
  usernamesOfObs$ = of(this.usernames).pipe(
    map((value) => value.map((el) => el.toUpperCase()))
  );

  usernamesSignal = toSignal(this.usernamesOfObs$);

  usernamesFromObs$ = from(this.usernames);

  ngOnInit() {
    //Map Operator
    // this.usernamesFromObs$
    //   .pipe(map((value) => value + ' Arsov'))
    //   .subscribe((value) => console.log(value));
    //Filter
    // this.usernamesFromObs$
    //   .pipe(filter((value) => value.startsWith('S')))
    //   .subscribe((value) => console.log(value));
    //Take
    // this.usernamesFromObs$
    //   .pipe(take(5))
    //   .subscribe((value) => console.log(value));
    //Tap
    // this.usernamesFromObs$
    //   .pipe(tap((value) => console.log('in the tap', value)))
    //   .subscribe();
    //Chaining operators in RxJs
    this.usernamesFromObs$
      .pipe(
        filter((value) => value.startsWith('R')),
        map((value) => value + ' Ristov'),
        skip(1)
        // takeLast(1)
      )
      .subscribe((value) => console.log(value));
  }
}
