import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, PopoverController, ViewController, ModalController } from 'ionic-angular';
import { User } from './../../providers/user/user';
import { Utils } from './../../providers/utils/utils';
import { Api } from './../../providers/api/api';
import { Brand } from './../../providers/brand/brand';

@IonicPage({
    defaultHistory: ['ProfilePage'],
    segment: 'brand-owner/:id'
})
@Component({
    selector: 'page-brand-owner',
    templateUrl: 'brand-owner.html',
})
export class BrandOwnerPage {
    ad_type = 'promos';
    brand;

    promos: any = [];
    loadingPromos = true;
    ads: any = [];
    loadingAds = true;

    constructor(
        public popoverCtrl: PopoverController,
        public navCtrl: NavController,
        public modalCtrl: ModalController,
        public viewCtrl: ViewController,
        public alertCtrl: AlertController,
        public navParams: NavParams,
        public api: Api,
        public User: User,
        public utils: Utils,
        public _brand: Brand,
    ) {
        this.brand = this.navParams.get('brand');
        console.log(this.brand);
        this.loadPromos();
        this.loadAds();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad BrandOwnerPage');

    }

    loadPromos() {
        this._brand.getPromos(this.brand)
            .then(promos => {
                this.loadingPromos = false;
                this.promos = promos;
                this.brand.promos = promos;
            })
    }

    loadAds() {
        this._brand.getAds(this.brand)
            .then(ads => {
                this.loadingAds = false;
                this.ads = ads;
                this.brand.ads = ads;
            })
    }

    openMenu(ev) {
        console.log(this.brand);
        let p = this.popoverCtrl.create("BrandOwnerMenuPage", { brand: this.brand });

        p.onDidDismiss(selection => {
            this.menuCases(selection);
        })

        p.present({ ev });
    }

    openPromoMenu(ev, promo) {
        console.log(promo);
        let p = this.popoverCtrl.create("PromoOwnerMenuPage");

        p.onDidDismiss(selection => {
            this.menuCases(selection, promo);
        })

        p.present({ ev });
    }


    openAdMenu(ev, ad) {
        console.log(ad);
        let p = this.popoverCtrl.create("AdOwnerMenuPage");

        p.onDidDismiss(selection => {
            this.menuCases(selection, ad);
        })

        p.present({ ev });
    }


    gotoBrand() {
        this.modalCtrl.create("BrandDetailsPage", {
            id: this.brand.id,
            brand: this.brand
        }).present();
    }

    showStats() {
        this.modalCtrl.create("BrandStatsPage", {
            id: this.brand.id,
            brand: this.brand
        }).present();
    }

    editBrand() {
        this.modalCtrl.create("BrandAddPage", {
            edit_id: this.brand.id,
            brand: this.brand
        }).present();
    }

    addToBrandFinder() {
        var con = confirm("Are you sure you want to add this company to the brand finder?");

        if (con) {
            this._brand.addToFinder(this.brand)
                .then((res: any) => {
                    this.utils.showToast(res.message);
                })
        }
    }

    removeFromBrandFinder() {
        var con = confirm("Are you sure you want to remove this company from the brand finder?");

        if (con) {
            this._brand.removeFromFinder(this.brand)
                .then((res: any) => {
                    this.utils.showToast(res.message);
                })
        }
    }

    confirmBrandDelete() {
        let confirm = this.alertCtrl.create({
            title: 'Delete ' + this.brand.name + '?',
            message: 'Are you sure? You cannot revert this action',
            buttons: [
                {
                    text: 'No, Stop',
                    handler: () => {
                        console.log('Disagree clicked');
                    }
                },
                {
                    text: 'Yes, Delete',
                    handler: () => {
                        console.log('Agree clicked');
                        this.deleteBrand();
                    }
                }
            ]
        });
        confirm.present();
    }
    deleteBrand() {
        console.log("deleting vendor now...");
        this.api.get("vendors/" + this.brand.id + "/delete")
            .subscribe((res: any) => {
                this.viewCtrl.dismiss().then(() => {
                    this.utils.showToast(res.message);
                    this.User.deleteVendor(this.brand);
                });
            });
    }

    confirmPromoAdDelete(promo_ad, type: string) {
        let confirm = this.alertCtrl.create({
            title: 'Delete ?',
            message: 'Are you sure? You cannot revert this action',
            buttons: [
                {
                    text: 'No, Stop',
                    handler: () => {
                        console.log('Disagree clicked');
                    }
                },
                {
                    text: 'Yes, Delete',
                    handler: () => {
                        console.log('Agree clicked');
                        if (type === 'promo') {
                            this.deletePromo(promo_ad);
                        } else if (type === 'ad') {
                            this.deleteAd(promo_ad);
                        }
                    }
                }
            ]
        });
        confirm.present();
    }
    deletePromo(promo) {
        this.utils.startLoading();
        console.log("deleting promo now...");
        this._brand.deletePromo(promo)
            .then((res: any) => {
                this.utils.stopLoading();
                this.utils.showToast(res.message);
            });
    }
    deleteAd(ad) {
        this.utils.startLoading();
        console.log("deleting ad now...");
        this._brand.deleteAd(ad)
            .then((res: any) => {
                this.utils.stopLoading();
                this.utils.showToast(res.message);
            });
    }

    viewAd(ad) {
        this.navCtrl.push("AdDetailsPage", { id: ad, ad });
    }

    viewPromo(promo) {
        this.navCtrl.push("PromoDetailsPage", { id: promo.id, promo });
    }

    addPromo() {
        this.modalCtrl.create("PromoAddPage", { brand: this.brand }).present();
    }

    addGratis() {
        this.modalCtrl.create("GratisAddPage", { brand: this.brand }).present();
    }

    showPromoStats(promo) {
        this.modalCtrl.create("PromoOwnerStatsPage", { promo: promo }).present();
    }
    showGratisStats(ad) {
        this.modalCtrl.create("GratisOwnerStatsPage", { ad: ad }).present();
    }

    editPromo(promo) {
        this.modalCtrl.create("PromoAddPage", {
            edit_id: promo.id,
            promo: promo,
            brand: this.brand
        }).present();
    }

    editAd(ad) {
        this.modalCtrl.create("GratisAddPage", {
            edit_id: ad.id,
            ad: ad,
            brand: this.brand
        }).present();
    }

    menuCases(selection, obj = null) {
        switch (selection) {
            case 'viewBrand':
                this.gotoBrand();
                break;
            case 'addToFinder':
                console.log("execute... add to finder");
                this.addToBrandFinder();
                break;
            case 'removeFromFinder':
                this.removeFromBrandFinder();
                break;
            case 'showStats':
                this.showStats();
                break;
            case 'editBrand':
                this.editBrand();
                break;
            case 'deleteBrand':
                this.confirmBrandDelete();
                break;

            case 'viewPromo':
                this.viewPromo(obj);
                break;
            case 'deletePromo':
                this.confirmPromoAdDelete(obj, 'promo');
                break;
            case 'showPromoStats':
                this.showPromoStats(obj);
                break;
            case 'editPromo':
                this.editPromo(obj);
                break;

            case 'viewAd':
                this.viewAd(obj);
                break;
            case 'deleteAd':
                this.confirmPromoAdDelete(obj, 'ad');
                break;
            case 'showAdStats':
                this.showGratisStats(obj);
                break;
            case 'editAd':
                this.editAd(obj);
                break;

            default:
                break;
        }
    }
}
