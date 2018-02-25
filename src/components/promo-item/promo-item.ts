import { Component, Input } from '@angular/core';

@Component({
    selector: 'promo-item',
    templateUrl: 'promo-item.html'
})
export class PromoItemComponent {
    @Input('sponsored') sponsored = false;
    @Input('promo') promo = null;

    constructor() {
        console.log('Hello PromoItemComponent Component');
    }

}
