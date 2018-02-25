import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Api } from './../api/api';
import { Model } from './../model/model';
import { User } from './../user/user';

@Injectable()
export class Brand extends Model {

    model = 'vendors';
    promos: any = [];
    ads: any = [];

    constructor(public api: Api, public _user: User) {
        super(api, _user);
    }

    submitPromo(newPromo, brand) {
        return new Promise((resolve, reject) => {
            this.api.post("submitpromo/" + brand.id, newPromo)
                .subscribe(resp => {
                    this.promos.push(resp);
                    console.log(resp);
                    resolve(resp);
                });
        });
    }

    editPromo(newPromo) {
        let editPromo:any = {
            description: newPromo.description,
            short_description: newPromo.short_description,
            category: newPromo.category,
            location: newPromo.location,
        }

        return new Promise((resolve, reject) => {
            this.api.post("promos/" + newPromo.id + "/edit", editPromo)
                .subscribe((promo:any) => {
                    this.promos.forEach((p, i) => {
                        if(p.id === promo.id){
                            this.promos[i] = promo;
                        }
                    });
                    console.log(promo);
                    resolve(promo);
                });
        });
    }

    submitAd(newAd, brand) {
        return new Promise((resolve, reject) => {
            this.api.post("submitad/" + brand.id, newAd)
                .subscribe(resp => {
                    this.ads.push(resp);
                    console.log(resp);
                    resolve(resp);
                });
        });
    }



    editAd(newAd) {
        let editAd:any = {
            description: newAd.description,
            category: newAd.category,
            location: newAd.location,
            how_to_claim: newAd.how_to_claim
        }

        return new Promise((resolve, reject) => {
            this.api.post("ads/" + newAd.id + "/edit", editAd)
                .subscribe((ad:any) => {
                    this.ads.forEach((a, i) => {
                        if(a.id === ad.id){
                            this.ads[i] = ad;
                        }
                    });
                    console.log(ad);
                    resolve(ad);
                });
        });
    }

    getPromos(brand) {
        return new Promise((resolve, reject) => {
            this.api.get("vendor/" + brand.id + "/promos")
                .subscribe(promos => {
                    console.log(promos);
                    this.promos = promos;
                    resolve(this.promos);
                });
        });
    }

    getAds(brand) {
        return new Promise((resolve, reject) => {
            this.api.get("vendor/" + brand.id + "/ads")
                .subscribe(ads => {
                    console.log(ads);
                    this.ads = ads;
                    resolve(this.ads);
                });
        });
    }

    addToFinder(brand) {
        return new Promise((resolve, reject) => {
            this.api.get(this.model + "/" + brand.id + "/finder")
                .subscribe(res => {
                    resolve(res);
                    brand.find = true;
                    this.getData(true);
                })
        })
    }

    removeFromFinder(brand) {
        return new Promise((resolve, reject) => {
            this.api.get(this.model + "/" + brand.id + "/finder/remove")
                .subscribe(res => {
                    resolve(res);
                    brand.find = false;
                    this.getData(true);
                })
        })
    }

    deletePromo(promo) {
        return new Promise((resolve, reject) => {
            this.api.get("promos/" + promo.id + "/delete")
                .subscribe((res: any) => {
                    console.log(res);
                    resolve(res);

                    this.promos.forEach((p, i) => {
                        if (p.id === promo.id) {
                            this.promos.splice(i, 1);
                        }
                    });
                });
        })
    }

    deleteAd(ad) {
        return new Promise((resolve, reject) => {
            this.api.get("ads/" + ad.id + "/delete")
                .subscribe((res: any) => {
                    console.log(res);
                    resolve(res);

                    this.ads.forEach((a, i) => {
                        if (a.id === ad.id) {
                            this.ads.splice(i, 1);
                        }
                    });
                });
        })
    }

    getStats(brand_id){
        return new Promise((resolve, reject) => {
            this.api.get("track/get_stats/brand/" + brand_id)
            .subscribe((stats: any) => {
                resolve(stats);
            });
        })
    }
}
