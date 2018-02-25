import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'page-promo-owner-menu',
    templateUrl: 'promo-owner-menu.html',
})
export class PromoOwnerMenuPage {

    constructor(public viewCtrl: ViewController, public navParams: NavParams) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad PromoOwnerMenuPage');
    }

    select(selection = false) {
        console.log("Selected: " + selection);
        this.viewCtrl.dismiss(selection);
    }

}
