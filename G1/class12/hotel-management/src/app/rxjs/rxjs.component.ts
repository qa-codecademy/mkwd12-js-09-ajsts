import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Room } from '../../types/room.interface';
import { RoomType } from '../../types/room-type.enum';
import { RoomView } from '../../types/room-view.enum';
import { ParkingType } from '../../types/parking-type.enum';
import { Board } from '../../types/board.enum';
import { BehaviorSubject, Observable, Subject, interval, map, takeUntil, tap } from 'rxjs';
import { RoomsService } from '../../services/rooms.service';

@Component({
  selector: 'app-rxjs',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './rxjs.component.html',
  styleUrl: './rxjs.component.css'
})
export class RxjsComponent {

  componentDestroyed = new Subject<void>();

  defaultRoom: Room = {
    id: 'abc',
    name: 'Default name',
    description: 'Default description',
    type: RoomType.Double,
    pricePerNight: 1500,
    beds: 2,
    extraBeds: 1,
    baths: 1,
    guestCapacity: 3,
    view: RoomView.Sea,
    images: ['image1', 'image1'],
    city: 'Skopje',
    country: 'Macedonia',
    parking: ParkingType.Free,
    isPetFriendly: true,
    board: Board.FullBoard,
    hasAirConditioning: true
  }

  roomBehaviorSubject: BehaviorSubject<Room | null> = new BehaviorSubject<Room | null>(null);
  roomSubject: Subject<Room | null> = new Subject<Room | null>();
  roomObservable: Observable<Room> = new Observable<Room>

  roomId = '55a01f31-1d4a-45a5-ad6e-30d188c33f39';

  constructor(
    private readonly roomService: RoomsService,
  ){}

  ngOnInit() {
    this.roomObservable = this.roomService.getRoom(this.roomId);
    // this.roomObservable.subscribe(res => {
    //   console.log(res);
    // });
    // console.log(this.roomObservable); // will log the observable, not the result
    // this.roomBehaviorSubject.next(this.defaultRoom);
    // const loadedRoom = this.roomBehaviorSubject.getValue();

    // console.log('LOADED ROOM', loadedRoom);

    // this.mapRoomResult().subscribe(res => console.log(res));
    // this.getRoomDescription().subscribe();

    this.emitNumbers();
  }

  emitSubjectValue() {
    this.roomSubject.next(this.defaultRoom);
  }

  readSubjectValue() {
    this.roomSubject.subscribe(res => console.log(res));
  }

  emitBehaviorSubjectValue() {
    this.roomBehaviorSubject.next(this.defaultRoom);
  }

  readBehaviorSubjectValue() {
    this.roomBehaviorSubject.subscribe(res => console.log(res));
  }

  // Observables are unidirectional: we can only observe (read) values, meaning we wait for the data stream and cannot write to it (read-only).
  // Subjects and BehaviorSubjects are bidirectional: we can both emit new values into the stream and subscribe to receive values (read/write).
  // When we subscribe to an Observable, Subject, or BehaviorSubject, each subscription is independent (if I click the getSubjectValue 5 times it will subscribe to the result 5 times)
  // If we subscribe 5 times, each subscription will receive values independently when they are emitted.

  // Behavior subject must contain an initial value which is the value provided during declaration. This value is immediately available to all subscribers and it is kept in memory until a new value is emitted via calling the next() method
  // Subjects do not require initial value and they do not store the last emitted value, meaning that we cannot access the last value at any time, but just at the time it has been emitted
  // Behavior subjects keep the last emitted value and we can access it at any time
  // We can use the next() method on subjects and behavior subjects when we want to emit new value

  // A real-world use case for BehaviorSubject is tracking the currently logged-in user in an application.
  // We can store the current user in a BehaviorSubject and check its value whenever we need to verify permissions or access control.
  // BehaviorSubject will always hold the latest user information, even if the component re-renders or other parts of the app subscribe later.
  // Once the user loggs out, we can remove the currentUser value - set it to null by calling this.currentUser.next(null)

  // A real-world use case for Subject is for handling real-time notifications or events in an application, like chat messages or sensor updates.
  // We can use a Subject to emit each event (e.g., a new message or a sensor reading) as it happens, and any active subscribers will receive the latest event.
  // Subject does not store the last emitted value, so new subscribers will only receive future events and won't see past events.

  mapRoomResult() {
    return this.roomService.getRooms()
    .pipe(
      map((response: {payload: Room[], total: number}) => {
        // Transform the payload to extract only the name and the price
        return response.payload.map(room => ({
          name: room.name,
          pricePerNight: room.pricePerNight
        }))
      })
    )
  }

  getRoomDescription() {
    return this.roomService.getRoom(this.roomId)
      .pipe(
        tap(response => {
          console.log('DESCRIPTION', response);
        })
      )
  }


  emitNumbers() {
    const nuberObservable = interval(1000);

    nuberObservable
      .pipe(
        takeUntil(this.componentDestroyed)
      ).subscribe(num => {
        console.log('Emitted number:', num);
      })
  }

  ngOnDestroy() {
    this.componentDestroyed.next();
    this.componentDestroyed.complete();
  }

} 
