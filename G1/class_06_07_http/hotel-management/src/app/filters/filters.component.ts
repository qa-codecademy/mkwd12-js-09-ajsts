import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Board } from '../../types/board.enum';
import { MatRadioModule } from '@angular/material/radio';
import { RoomView } from '../../types/room-view.enum';
import { ParkingType } from '../../types/parking-type.enum';
import { MatSliderModule } from '@angular/material/slider';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatRadioModule,
    MatSliderModule,
    MatCheckboxModule,
  ],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.css',
})
export class FiltersComponent {
  boardOptions = Object.values(Board);
  viewOptions = Object.values(RoomView);
  parkingOptions = Object.values(ParkingType);

  guestCapacity = input<number>(1);
  onGuestCapacityChange = output<number>();

  beds = input<number>(1);
  onBedsChange = output<number>();

  board = input<Board>(Board.None);
  onBoardChange = output<Board>();

  view = input<RoomView>(RoomView.None);
  onViewChange = output<RoomView>();

  parking = input<ParkingType>(ParkingType.None);
  onParkingChange = output<ParkingType>();

  pricePerNightFrom = input<number>(1);
  onPricePerNightFromChange = output<number>();
  pricePerNightTo = input<number>(1000);
  onPricePerNightToChange = output<number>();

  hasAirConditioning = input<boolean>(false);
  onHasAirConditioningChange = output<boolean>();

  isPetFriendly = input<boolean>(false);
  onIsPetFriendlyChange = output<boolean>();
}
