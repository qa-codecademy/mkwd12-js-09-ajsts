import {
  Directive,
  ElementRef,
  HostListener,
  inject,
  input,
  OnInit,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appToggleAddress]',
  standalone: true,
})
export class ToggleAddressDirective implements OnInit {
  private elementRef = inject(ElementRef);
  private renderer = inject(Renderer2);

  isInitiallyOpen = input(false);
  addressDetailsEl: HTMLDivElement;
  isOpen = false;

  ngOnInit() {
    this.addressDetailsEl =
      this.elementRef.nativeElement.querySelector('.address-details');

    this.isOpen = this.isInitiallyOpen();

    this.renderer.setStyle(
      this.addressDetailsEl,
      'display',
      this.isOpen ? 'block' : 'none'
    );
  }

  @HostListener('click') onClick() {
    this.isOpen = !this.isOpen;
    this.renderer.setStyle(
      this.addressDetailsEl,
      'display',
      this.isOpen ? 'block' : 'none'
    );
  }
}
