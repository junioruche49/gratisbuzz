import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'page-brand-owner-menu',
    templateUrl: 'brand-owner-menu.html',
})
export class BrandOwnerMenuPage {

    brand = null;

    constructor(public viewCtrl: ViewController, public navParams: NavParams) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad BrandOwnerMenuPage');
        this.brand = this.navParams.get('brand');
    }
    select(selection=false) {
        console.log("Selected: "+selection);
        this.viewCtrl.dismiss(selection);
    }
}
