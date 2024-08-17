import { NgStyle } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  @Input({ required: true }) text: string;
  @Input() style: { [key: string]: string } = {};
  @Input() disabled = false;
  @Input() type: 'button' | 'submit' = 'button';

  @Output() btnClick = new EventEmitter<void>();

  onBtnClick() {
    this.btnClick.emit();
  }
}
