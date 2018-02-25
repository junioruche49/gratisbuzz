import { Component, Input } from '@angular/core';

@Component({
    selector: 'brand-item',
    templateUrl: 'brand-item.html'
})
export class BrandItemComponent {

    @Input() brand;

    constructor(
    ) { }

    ngOnInit() {
        // if (null == this.brand) throw new Error("The brand attribute is required");
        if (null == this.brand) {
            this.brand = {
                image: "",
                name: "Default Name",
                category: "Default Cat",
                location: "Default Location",
            }
        }

    }
}
