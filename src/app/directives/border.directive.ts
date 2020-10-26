import { Directive, ElementRef, Input, Renderer2, OnInit } from '@angular/core';

enum Colors {
  green = '#228B22',
  blue = 	'#0000FF',
}

@Directive({
  selector: '[appBorder]'
})
export class BorderDirective implements OnInit {

  @Input() public createdAt: string;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  public changeBorder(color: string): void {
    this.renderer.setStyle(this.el.nativeElement, 'borderColor', color);
  }

  public ngOnInit(): void {
    const currentDate: number = Date.now();
    const creationDate: number = Date.parse(this.createdAt);
    const dayInMs = 86400000;

    switch(true) {
    case (creationDate < currentDate && creationDate >= currentDate - dayInMs*14): {
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
