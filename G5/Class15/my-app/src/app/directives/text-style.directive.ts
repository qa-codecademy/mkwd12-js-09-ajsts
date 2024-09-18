import {
  Directive,
  ElementRef,
  HostListener,
  input,
  Input,
} from '@angular/core';

@Directive({
  selector: '[appTextStyle]',
  standalone: true,
})
export class TextStyleDirective {
  // Only for attribute directives
  constructor(private elementRef: ElementRef) {
    console.log(elementRef);
  }

  @Input() greetingMessage = '';
  context = input('');

  @HostListener('mouseenter') onMouseEnter() {
    console.log('On mouse enter');

    this.elementRef.nativeElement.style.boxShadow = `1px 1px 3px black`;
    // from some service, execute something
  }

  @HostListener('mouseleave') onMouseLeave() {
    console.log('On mouse leave');
  }

  @HostListener('click') onClick() {
    console.log(this.greetingMessage);
    console.log('On click');

    this.onElementClicked();
  }

  onElementClicked() {
    // some operation execution
    const timeOfClicking = new Date().toDateString();

    console.log('Element is clicked at:', timeOfClicking);
  }

  ngOnInit() {
    console.log('Inited');
    this.elementRef.nativeElement.innerHTML = this.context() || 'No context';
  }
}
