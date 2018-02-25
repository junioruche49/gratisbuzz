import { Component, Input } from '@angular/core';

@Component({
    selector: 'ad-item',
    templateUrl: 'ad-item.html'
})
export class AdItemComponent {

    @Input('sponsored') sponsored = false;
    @Input('ad') ad = null;
    @Input('pw') p_w = null;
    @Input('worth') worth = null;
    @Input('incentive') incentive = null;

    constructor() {
        console.log('Hello AdItemComponent Component');
    }

}
