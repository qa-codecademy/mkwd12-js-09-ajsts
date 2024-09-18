import {
  Directive,
  Input,
  input,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

@Directive({
  selector: '[appRoleBased]',
  standalone: true,
})
export class RoleBasedDirective {
  @Input() appRoleBased: string[] = [];
  private currentRole = '';

  // Structure directive only
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}

  ngOnInit() {
    this.currentRole = this.getUserRole();
    if (this.appRoleBased.includes(this.currentRole)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }

  private getUserRole() {
    return 'guest';
  }
}
