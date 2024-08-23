import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appHighlightCard]',
  standalone: true,
})
export class HighlightCardDirective {
  @Input() price: number | undefined;

  constructor(private el: ElementRef) {}

  ngOnChanges() {
    if (this.price && this.price <= 250) {
      this.el.nativeElement.style.border = '2px solid blue';
      this.el.nativeElement.style.boxShadow =
        '0px 0px 6px 2px rgba(0, 0, 255, 0.2)';
    }
  }
}
