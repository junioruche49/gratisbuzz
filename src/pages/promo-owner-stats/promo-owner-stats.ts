import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';
import { Promos } from './../../providers/promos/promos';

@IonicPage()
@Component({
    selector: 'page-promo-owner-stats',
    templateUrl: 'promo-owner-stats.html',
})
export class PromoOwnerStatsPage {

    promo: any = null;
    stats: any = [];
    loading = true;

    constructor(
        public viewCtrl: ViewController,
        public navParams: NavParams,
        public _promo: Promos,
    ) {
        this.promo = this.navParams.get("promo");
    }

    prepStats(stats){
        for (var stat in stats) {
            this.stats.push(
                {
                    key: stat.toUpperCase(),
                    value: stats[stat]
                }
            )
        }
    }

    ionViewDidLoad() {
        this.loading = true;
        console.log('ionViewDidLoad PromoOwnerStatsPage');
        this._promo.getStats(this.promo.id)
            .then(stats => {
                this.prepStats(stats);
                this.loading = false;
            })
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

}
