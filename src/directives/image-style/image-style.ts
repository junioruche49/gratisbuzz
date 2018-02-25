import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
    selector: '[image-style]' // Attribute selector
})
export class ImageStyleDirective {
    @Input("image-style") imageSrc;

    constructor(public el: ElementRef) {}

    ngOnInit(){
        this._setProperties();
    }

    _setProperties(){
        this.el.nativeElement.style.width = "70px";
        this.el.nativeElement.style.height = "70px";
        this.el.nativeElement.style.borderRadius = "50%";
        this.el.nativeElement.style.backgroundSize = "contain";
        this.el.nativeElement.style.backgroundPosition = "center center";
        this.el.nativeElement.style.backgroundRepeat = "no-repeat";
        this.el.nativeElement.style.backgroundColor = "#2d2439";

        this.el.nativeElement.style.backgroundImage = "url('"+this.imageSrc+"')";
    }

}
