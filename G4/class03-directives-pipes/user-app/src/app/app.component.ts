import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './core/components/header/header.component';
import { User } from './models/user.model';
import { UserCardComponent } from './feature/users/components/user-card/user-card.component';
import { HoverShadowDirective } from './core/directives/hover-shadow.directive';
import { FilterPipe } from './core/pipes/filter.pipe';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    UserCardComponent,
    HoverShadowDirective,
    FilterPipe,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  searchValue = signal('');

  onInputChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.searchValue.set(target.value);
  }

  users: User[] = [
    {
      id: 1,
      name: 'Leanne Graham',
      username: 'Bret',
      email: 'Sincere@april.biz',
      address: {
        street: 'Kulas Light',
        suite: 'Apt. 556',
        city: 'Gwenborough',
        zipcode: '92998-3874',
      },
      phone: '1-770-736-8031 x56442',
      website: 'hildegard.org',
      dateOfBirth: new Date(1971, 5, 4),
      hourlyRate: 10.99,
      rating: 0.454979,
    },
    {
      id: 2,
      name: 'Ervin Howell',
      username: 'Antonette',
      email: 'Shanna@melissa.tv',
      address: {
        street: 'Victor Plains',
        suite: 'Suite 879',
        city: 'Wisokyburgh',
        zipcode: '90566-7771',
      },
      phone: '010-692-6593 x09125',
      website: 'anastasia.net',
      dateOfBirth: new Date(1971, 9, 28),
      hourlyRate: 21.99,
      rating: 0.781236,
    },
    {
      id: 3,
      name: 'Clementine Bauch',
      username: 'Samantha',
      email: 'Nathan@yesenia.net',
      address: {
        street: 'Douglas Extension',
        suite: 'Suite 847',
        city: 'McKenziehaven',
        zipcode: '59590-4157',
      },
      phone: '1-463-123-4447',
      website: 'ramiro.info',
      dateOfBirth: new Date(1971, 7, 6),
      hourlyRate: 15.99,
      rating: 0.673531,
    },
    {
      id: 4,
      name: 'Patricia Lebsack',
      username: 'Karianne',
      email: 'Julianne.OConner@kory.org',
      address: {
        street: 'Hoeger Mall',
        suite: 'Apt. 692',
        city: 'South Elvis',
        zipcode: '53919-4257',
      },
      phone: '493-170-9623 x156',
      website: 'kale.biz',
      dateOfBirth: new Date(1971, 6, 5),
      hourlyRate: 55.99,
      rating: 0.801235,
    },
    {
      id: 5,
      name: 'Chelsey Dietrich',
      username: 'Kamren',
      email: 'Lucio_Hettinger@annie.ca',
      address: {
        street: 'Skiles Walks',
        suite: 'Suite 351',
        city: 'Roscoeview',
        zipcode: '33263',
      },
      phone: '(254)954-1289',
      website: 'demarco.info',
      dateOfBirth: new Date(1971, 8, 11),
      hourlyRate: 9.99,
      rating: 0.574579,
    },
    {
      id: 6,
      name: 'Mrs. Dennis Schulist',
      username: 'Leopoldo_Corkery',
      email: 'Karley_Dach@jasper.info',
      address: {
        street: 'Norberto Crossing',
        suite: 'Apt. 950',
        city: 'South Christy',
        zipcode: '23505-1337',
      },
      phone: '1-477-935-8478 x6430',
      website: 'ola.org',
      dateOfBirth: new Date(1971, 5, 24),
      hourlyRate: 29.99,
      rating: 0.807846,
    },
    {
      id: 7,
      name: 'Kurtis Weissnat',
      username: 'Elwyn.Skiles',
      email: 'Telly.Hoeger@billy.biz',
      address: {
        street: 'Rex Trail',
        suite: 'Suite 280',
        city: 'Howemouth',
        zipcode: '58804-1099',
      },
      phone: '210.067.6132',
      website: 'elvis.io',
      dateOfBirth: new Date(1991, 10, 14),
      hourlyRate: 35.0,
      rating: 0.497856,
    },
    {
      id: 8,
      name: 'Nicholas Runolfsdottir V',
      username: 'Maxime_Nienow',
      email: 'Sherwood@rosamond.me',
      address: {
        street: 'Ellsworth Summit',
        suite: 'Suite 729',
        city: 'Aliyaview',
        zipcode: '45169',
      },
      phone: '586.493.6943 x140',
      website: 'jacynthe.com',
      dateOfBirth: new Date(1992, 2, 1),
      hourlyRate: 11.99,
      rating: 0.475867,
    },
    {
      id: 9,
      name: 'Glenna Reichert',
      username: 'Delphine',
      email: 'Chaim_McDermott@dana.io',
      address: {
        street: 'Dayna Park',
        suite: 'Suite 449',
        city: 'Bartholomebury',
        zipcode: '76495-3109',
      },
      phone: '(775)976-6794 x41206',
      website: 'conrad.com',
      dateOfBirth: new Date(1964, 9, 14),
      hourlyRate: 10.0,
      rating: 0.79679,
    },
    {
      id: 10,
      name: 'Clementina DuBuque',
      username: 'Moriah.Stanton',
      email: 'Rey.Padberg@karina.biz',
      address: {
        street: 'Kattie Turnpike',
        suite: 'Suite 198',
        city: 'Lebsackbury',
        zipcode: '31428-2261',
      },
      phone: '024-648-3804',
      website: 'ambrose.net',
      dateOfBirth: new Date(1972, 3, 7),
      hourlyRate: 10.99,
      rating: 0.546718,
    },
  ];
}
