import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
    selector: '[appStickyHeader]',
})
export class StickyHeaderDirective {
    constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

    @HostListener('window:scroll', ['$event']) onscroll(): void {
        if (window.pageYOffset > 0) {
            this.renderer.addClass(this.elementRef.nativeElement, 'sticky');
        } else {
            this.renderer.removeClass(this.elementRef.nativeElement, 'sticky');
        }
    }
}
