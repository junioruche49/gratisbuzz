import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Brand } from '../../providers/brand/brand';

@IonicPage()
@Component({
    selector: 'page-brand-stats',
    templateUrl: 'brand-stats.html',
})
export class BrandStatsPage {

    brand = null;
    stats = {
        ads: [],
        promos: [],
    };
    loading = true;

    constructor(
        public navCtrl: NavController,
        public viewCtrl: ViewController,
        public navParams: NavParams,
        public _brand: Brand,
    ) {
        this.brand = this.navParams.get("brand");
        console.log(this.brand);
    }

    prepStats(stats){
        for (var as in stats['adsStats']) {
            this.stats.ads.push(
                {
                    key: as.toUpperCase(),
                    value: stats['adsStats'][as]
                }
            )
        }

        for (var ps in stats['promosStats']) {
            this.stats.promos.push(
                {
                    key: ps.toUpperCase(),
                    value: stats['promosStats'][ps]
                }
            )
        }

        console.log(this.stats);
    }

    ionViewDidLoad() {
        this.loading = true;
        console.log('ionViewDidLoad BrandStatsPage');
        this._brand.getStats(this.brand.id)
            .then(stats => {
                this.prepStats(stats);
                this.loading = false;
            })
    }

    dismiss(){
        this.viewCtrl.dismiss();
    }

}
