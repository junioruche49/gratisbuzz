import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Gratis } from './../../providers/gratis/gratis';

@IonicPage()
@Component({
    selector: 'page-win',
    templateUrl: 'win.html',
})
export class WinPage {

    loadingAds = false;
    winAds: any = [];

    constructor(
        public navCtrl: NavController, public navParams: NavParams,
        public _ads: Gratis
    ) {
        this.getAds();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad WinPage');
    }

    getAds() {
        this.loadingAds = true;

        this._ads.getData().then(liveads => {
            this.loadingAds = false;
            this.winAds = this._ads.winAds;
            console.log(this.winAds);
        })
    }

    gotoAd(ad, question, livead) {
        this.navCtrl.push('AdDetailsPage', { id: ad.id, ad, question, livead });
    }

}
