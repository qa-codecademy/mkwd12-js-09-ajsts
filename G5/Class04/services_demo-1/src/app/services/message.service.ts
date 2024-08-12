import { EventEmitter, Injectable } from '@angular/core';

interface Person {
  id: string;
  name: string;
  age: number;
}
@Injectable({
  providedIn: 'root', // accessable all over the app
})
export class MessageService {
  constructor() {}

  message = new EventEmitter<string>();

  person = new EventEmitter<Person>();

  componentBTitle = 'Component B';

  setMessage(messageValue: string) {
    console.log('Message in service:', messageValue);
    this.message.emit(messageValue);

    this.person.emit({ id: '1', name: 'John Doe', age: 26 });
  }

  getMessage() {
    return this.message;
  }
}
