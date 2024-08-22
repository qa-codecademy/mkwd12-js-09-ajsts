import {
  AfterViewInit,
  Directive,
  effect,
  ElementRef,
  input,
  Input,
  OnChanges,
  OnInit,
} from '@angular/core';

@Directive({
  selector: '[appHighlightCard]',
  standalone: true,
})
export class HighlightCardDirective implements AfterViewInit {
  @Input() price: number | undefined;
  // price = input<number | undefined>();

  constructor(private el: ElementRef) {
    // effect(() => {
    //   console.log('price', this.price());
    // });
  }

  ngOnChanges() {
    console.log(this.price);
    // if (this.price()!! && this.price() <= 250) {
    //   this.el.nativeElement.style.border = '2px solid blue';
    //   this.el.nativeElement.style.boxShadow = '0 4px 8px rgba(0, 0, 255, 0.2)';
    // }
  }

  ngAfterViewInit(): void {
    console.log(this.price);
    if (this.price!! && this.price <= 250) {
      this.el.nativeElement.style.border = '2px solid blue';
      this.el.nativeElement.style.boxShadow = '0 4px 8px rgba(0, 0, 255, 0.2)';
    }
  }
}
