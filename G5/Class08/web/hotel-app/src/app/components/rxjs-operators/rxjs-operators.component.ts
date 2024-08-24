import { Component } from '@angular/core';
import {
  Observable,
  filter,
  map,
  take,
  catchError,
  of,
  Subscription,
} from 'rxjs';

interface MovieDetail {
  title: string;
  rating: number;
}
@Component({
  selector: 'app-rxjs-operators',
  standalone: true,
  imports: [],
  templateUrl: './rxjs-operators.component.html',
  styleUrl: './rxjs-operators.component.css',
})
export class RxjsOperatorsComponent {
  moviesObservable = new Observable<MovieDetail>((observer) => {
    observer.next({ title: 'The Dark Knight', rating: 3 });
    observer.next({
      title: 'Harry Potter and the Half Blood Prince',
      rating: 5,
    });
    observer.next({
      title: 'Fast and Furious',
      rating: 1,
    });
    observer.next({
      title: 'Forest Gump',
      rating: 4,
    });
    observer.error('An error occured!!!');
    observer.next({
      title: 'Mr.Robot',
      rating: 5,
    });
  });

  subscriptions: Subscription[] = [];
  ngOnInit() {
    // WITHOUT RXJS OPERATORS
    // this.moviesObservable.subscribe((data) => {
    //   if (data.rating > 3) {
    //     console.log(data);
    //   }
    // });

    // WITH RXJS OPERATORS
    console.log('** FILTER');
    // ** FILTER
    const sub1 = this.moviesObservable
      .pipe(filter((data) => data.rating > 3)) // ONE LINE EXPRESSION
      .subscribe((dataSubscribed) => {
        console.log(dataSubscribed);
      });
    this.subscriptions.push(sub1);
    console.log('** MAP');
    // ** MAP
    const sub2 = this.moviesObservable
      .pipe(
        map((data) => {
          // MULTI LINE EXPRESSION
          return {
            title: data.title.toUpperCase(),
            rating: data.rating,
          };
        })
      )
      .subscribe((dataSubscribed) => {
        console.log(dataSubscribed);
      });
    this.subscriptions.push(sub2);
    console.log('** TAKE');
    // ** TAKE
    const sub3 = this.moviesObservable
      .pipe(take(1))
      .subscribe((dataSubscribed) => {
        console.log(dataSubscribed);
      });
    this.subscriptions.push(sub3);
    console.log('** MAP + FILTER');
    // ** MAP + FILTER
    const sub4 = this.moviesObservable
      .pipe(
        filter((data) => data.rating > 3),
        map((data) => {
          // MULTI LINE EXPRESSION
          return {
            title: data.title.toUpperCase(),
            rating: data.rating,
          };
        })
      )
      .subscribe((dataSubscribed) => {
        console.log(dataSubscribed);
      });
    this.subscriptions.push(sub4);
    console.log('** CATCH ERROR');
    // ** CATCH ERROR
    const sub5 = this.moviesObservable
      .pipe(
        catchError((error) => {
          console.error('Error caught', error);
          /**
           * - Log the error in some system
           * - Change BehaveourSubject value if error happened
           */

          // MUST RETURN OBSERVABLE

          return of({ message: 'Error here' });
        })
      )
      .subscribe((dataSubscribed) => {
        console.log(dataSubscribed);
      });

    this.subscriptions.push(sub5);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
