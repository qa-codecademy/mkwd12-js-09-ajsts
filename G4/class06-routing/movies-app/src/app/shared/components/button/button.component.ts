import { NgStyle } from '@angular/common';
import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  text = input.required<string>();
  btnClick = output();
  style = input<{ [key: string]: string }>({});
  disabled = input(false);
  type = input<'button' | 'submit'>('button');

  onBtnClick() {
    this.btnClick.emit();
  }
}
