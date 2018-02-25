import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';
import { Gratis } from './../../providers/gratis/gratis';

@IonicPage()
@Component({
    selector: 'page-gratis-owner-stats',
    templateUrl: 'gratis-owner-stats.html',
})
export class GratisOwnerStatsPage {

    ad: any = null;
    stats: any = [];
    loading = true;

    constructor(
        public viewCtrl: ViewController,
        public navParams: NavParams,
        public _ad: Gratis
    ) {
        this.ad = this.navParams.get("ad");
    }

    ionViewDidLoad() {
        this.loading = true;
        console.log('ionViewDidLoad GratisOwnerStatsPage');
        this._ad.getStats(this.ad.id)
        .then(stats => {
            this.prepStats(stats);
            this.loading = false;
        })
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

    dismiss() {
        this.viewCtrl.dismiss();
    }

}
