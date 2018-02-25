import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Utils } from './../../providers/utils/utils';

@IonicPage({
    defaultHistory: ['BrandsPage'],
    segment: 'brand-detail/:id'
})
@Component({
    selector: 'page-brand-details',
    templateUrl: 'brand-details.html',
})
export class BrandDetailsPage {

    image = "assets/img/queen-live.png";
    brand: any = {};

    constructor(
        public viewCtrl: ViewController,
        public navCtrl: NavController,
        public navParams: NavParams,
        public utils: Utils
    ) {
        this.brand = this.navParams.get('brand');
        console.log(this.brand);
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad BrandDetailsPage')
    }

    hasSocial() {
        return this.brand.twitter || this.brand.facebook || this.brand.instagram || this.brand.youtube
    }

    hasStore() {
        return this.brand.store || this.brand.store2
    }

    openLink(link, type="link") {
        this.utils.openLink(link, type);
    }

    openCall(number) {
        this.utils.openCall(number)
    }

    openEmail(email) {
        this.utils.openEmail(email)
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

}
