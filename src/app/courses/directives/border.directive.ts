import { Directive, ElementRef, Input, Renderer2, OnInit } from '@angular/core';
import { Colors, dayInMs, requiredDays } from 'src/assets/variables';

@Directive({
  selector: '[appBorder]'
})
export class BorderDirective implements OnInit {

  @Input('appBorder') public createdAt: string;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  public changeBorder(color: string): void {
    this.renderer.setStyle(this.el.nativeElement, 'borderColor', color);
  }

  public ngOnInit(): void {
    const currentDate: number = Date.now();
    const creationDate: number = Date.parse(this.createdAt);

    switch(true) {
    case (creationDate < currentDate && creationDate >= currentDate - dayInMs*requiredDays): {
      this.changeBorder(Colors.green);
      break;
    }
    case (creationDate > currentDate): {
      this.changeBorder(Colors.blue);
      break;
    }
    default: break;
    }
  }
}
