import { Component } from '@angular/core';
import { RoomService } from '../../services/room.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Room } from '../../types/room.interface';
import { Board } from '../../types/board.enum';
import { ParkingType } from '../../types/parking-type.enum';
import { RoomType } from '../../types/room-type.enum';
import { RoomView } from '../../types/room-view.enum';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-guests',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './guests.component.html',
  styleUrl: './guests.component.css'
})
export class GuestsComponent {

  defaultRoom: Room = {
    id: 'abc',
    name: 'Default room',
    description: 'Default description',
    type: RoomType.Double,
    pricePerNight: 1500,
    beds: 2,
    extraBeds: 1,
    baths: 1,
    guestCapacity: 3,
    view: RoomView.Sea,
    images: ['image'],
    city: 'Skopje',
    country: 'Macedonia',
    parking: ParkingType.Free,
    isPetFriendly: true,
    board: Board.FullBoard,
    hasAirConditioning: true,
  }

  roomBehaviorSubject: BehaviorSubject<Room | null> = new BehaviorSubject<Room | null>(null);
  roomSubject: Subject<Room | null> = new Subject<Room | null> ();
  roomObservable: Observable<Room | null> = new Observable<Room | null>

  roomId = 'c7264cf9-a5bd-4288-a530-385cb6dc7a97';

  constructor(
    private readonly roomService: RoomService
  ) {
    // console.log('Guests component loaded');
  }

  ngOnInit() {
    this.roomObservable = this.roomService.getRoom(this.roomId);
    this.roomObservable.subscribe(res => console.log(res));
  }

  emitSubjectValue() {
    this.roomSubject.next(this.defaultRoom);
  }

  getSubjectValue() {
    this.roomSubject.subscribe(result => console.log(result));
  }

  emitBehaviorSubjectValue() {
    this.roomBehaviorSubject.next(this.defaultRoom);
  }

  getBehaviorSubjectValue() {
    this.roomBehaviorSubject.subscribe(result => console.log(result));
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

}
