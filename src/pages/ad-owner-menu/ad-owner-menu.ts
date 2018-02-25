import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'page-ad-owner-menu',
    templateUrl: 'ad-owner-menu.html',
})
export class AdOwnerMenuPage {

    constructor(public viewCtrl: ViewController, public navParams: NavParams) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad AdOwnerMenuPage');
    }

    select(selection = false) {
        console.log("Selected: " + selection);
        this.viewCtrl.dismiss(selection);
    }

}
