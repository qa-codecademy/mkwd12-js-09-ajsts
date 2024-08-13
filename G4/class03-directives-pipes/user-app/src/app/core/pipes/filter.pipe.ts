import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../../models/user.model';

@Pipe({
  name: 'filter',
  standalone: true,
})
export class FilterPipe implements PipeTransform {
  transform(value: User[], searchValue: string): User[] {
    if (!searchValue) return value;

    const filteredUsers = value.filter((user) =>
      user.name.toLowerCase().includes(searchValue.toLowerCase().trim())
    );

    return filteredUsers;
  }
}
