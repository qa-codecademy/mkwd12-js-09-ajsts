import {
  Directive,
  ElementRef,
  HostListener,
  inject,
  OnInit,
  Renderer2,
} from '@angular/core';

@Directive({
  // The selector for a directive is used to apply it to elements ex: <div appHoverShadow>
  selector: '[appHoverShadow]',
})
export class HoverShadowDirective implements OnInit {
  //Element ref is injected and inside will have the nativeElement property which contains the html element on which the directive is applied
  private elementRef = inject(ElementRef);
  private renderer = inject(Renderer2);

  ngOnInit(): void {
    console.log('directive created');
    // this.elementRef.nativeElement.style.transition = '0.1s ease-in';

    //Renderer way of changing element styles (recommended angular way)
    this.renderer.setStyle(
      this.elementRef.nativeElement,
      'transition',
      '0.1s ease-in-out'
    );

    //Use this to add listeners if you don't want to use hostListener or you need to listen on the document
    this.renderer.listen(this.elementRef.nativeElement, 'click', () => {
      console.log('renderer event called');
    });
  }

  //You call the decorator with the event type and then write a custom method to execute the logic when the event is fired
  // @HostListener('click') onClick() {
  //   console.log('element clicked');
  // }

  @HostListener('mouseenter') onMouseEnter() {
    this.renderer.setStyle(
      this.elementRef.nativeElement,
      'box-shadow',
      '0 3px 10px rgba(0,0,0,0.36), 0 3px 10px rgba(0,0,0,0.33)'
    );
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.renderer.setStyle(this.elementRef.nativeElement, 'box-shadow', 'none');
  }
}
