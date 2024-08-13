import { Component, input, OnInit } from '@angular/core';
import { User } from '../../../../models/user.model';
import { HoverShadowDirective } from '../../../../core/directives/hover-shadow.directive';
import { CommonModule } from '@angular/common';
import { ShortenPipe } from '../../../../core/pipes/shorten.pipe';
import { ToggleAddressDirective } from '../../../../core/directives/toggle-address.directive';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [
    HoverShadowDirective,
    CommonModule,
    ShortenPipe,
    ToggleAddressDirective,
  ],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
})
export class UserCardComponent implements OnInit {
  user = input.required<User>();

  constructor() {
    // console.log(this.user());
  }

  ngOnInit(): void {
    // console.log(this.user());
  }
}
