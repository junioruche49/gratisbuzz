import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { Promos } from './../../providers/promos/promos';
import { Gratis } from './../../providers/gratis/gratis';
import { Api } from '../../providers/api/api';

@IonicPage()
@Component({
    selector: 'page-ads',
    templateUrl: 'ads.html',
})
export class AdsPage {

    ad_type = "promos";
    loadingPromos = true;
    livepromos: any = [];
    loadingAds = true;
    liveads: any = [];
    search: any = {
        category: "All",
        state: "All",
        lga: "All",
        location: "All, All"
    };

    constructor(
        public navCtrl: NavController,
        public popoverCtrl: PopoverController,
        public navParams: NavParams,
        public _promos: Promos,
        public _ads: Gratis,
        public api: Api,
    ) {
        this.getPromos();
        this.getAds();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad AdsPage');
    }

    openSearch(ev){
        var searchPop = this.popoverCtrl.create('AdSearchPage');

        searchPop.onDidDismiss(data => {
            console.log(data);
            this.search = data;
            this.getLivePromosWithSearch();
            this.getLiveAdsWithSearch();
        })

        searchPop.present({
            ev: ev
        });
    }

    getPromos() {
        this._promos.getData().then(livepromos => {
            this.loadingPromos = false;
            this.livepromos = livepromos;
            console.log(this.livepromos);
        })
    }

    getAds() {
        this._ads.getData().then(liveads => {
            this.loadingAds = false;
            this.liveads = liveads;
            console.log(this.liveads);
        })
    }

    getLivePromosWithSearch() {
        this.loadingPromos = true;

        console.log("getting promo with:");
        console.log(this.search);

        this.api.post("livepromos", this.search)
            .subscribe(data => {
                console.log(data);
                this.livepromos = data;

                this.loadingPromos = false;
            });
    }
    getLiveAdsWithSearch() {
        this.loadingAds = true;

        this.api.post("liveads", this.search)
            .subscribe(data => {
                console.log(data);
                this.liveads = data;

                this.loadingAds = false;
            });
    }


    gotoPromo(promo) {
        console.log(promo);
        this.navCtrl.push('PromoDetailsPage', { id: promo.id, promo });
    }

    gotoAd(ad, question, livead) {
        this.navCtrl.push('AdDetailsPage', { id: ad.id, ad, question, livead });
    }

}
