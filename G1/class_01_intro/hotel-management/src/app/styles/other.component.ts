import { Component } from "@angular/core";

@Component({
  selector: 'app-other-component',
  standalone: true,
  template: `
    <div>
      <p class="bg-red text-yellow">Another red box</p>
    </div>
  `,
  // styles: `
  //   .text-yellow {
  //     color: blue;
  //   }
  // `,
  styles: [
    `
      .text-yellow {
        color: blue;
      }
    `
  ]
})

export class OtherComponent {

}