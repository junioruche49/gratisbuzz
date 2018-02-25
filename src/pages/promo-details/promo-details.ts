import { Promos } from './../../providers/promos/promos';
import { Utils } from './../../providers/utils/utils';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Platform } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import { User } from './../../providers/user/user';

@IonicPage({
    defaultHistory: ['AdsPage'],
    segment: 'promo-detail/:id'
})
@Component({
    selector: 'page-promo-details',
    templateUrl: 'promo-details.html',
})
export class PromoDetailsPage {

    id = null;
    promo = null;
    user_image = null;
    likeable = true;
    promocomment = "";
    postLoading = false;
    loading = true;

    constructor(
        public navCtrl: NavController,
        public modalCtrl: ModalController,
        public navParams: NavParams,
        public socialSharing: SocialSharing,
        public _user: User,
        public _promo: Promos,
        public _utils: Utils,
        public platform: Platform
    ) {
        this.promo = this.navParams.get("promo");
        this.id = this.navParams.get("id");
        this.user_image = this._user._user.image;
        this.loadLatestPromo();
    }

    loadLatestPromo(){
        this._promo.loadLatest(this.id)
            .then(latestPromo => {
                console.log(latestPromo);
                this.promo = latestPromo;
                this.loading = false;
            })
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad PromoDetailsPage');
        // this.checkLikeable();
        // this._promo.view(this.promo.id, this._user._user.id);
        // this._utils.setLinkMetas('promo', this.promo.id);

    }

    gotoBrand(){
        this.modalCtrl.create('BrandDetailsPage', {id:this.promo.vendor.id, brand:this.promo.vendor}).present();
    }

    share() {
        var shareBegin = new Date();

        this.socialSharing.share(
            "At the Gratisbuzz App - " + this.promo.short_description + " - " + this.promo.description,
            this.promo.description, "", "http://gratisbuzz.com/site/promo.php?id="+this.promo.id)
            .then(() => {
                var shareEnd = new Date();

                var seconds = Math.abs((shareBegin.getTime() - shareEnd.getTime()) / 1000);

                console.log(seconds);

                if(seconds > 4){
                    console.log("Successfully Shared");
                    this.submitShare();
                }else{
                    console.log("You haven't shared");
                }
            }).catch((err) => {
                this._utils.showToast(err);
            });
    }
    submitShare() {
        this._promo.submitShare(this.promo.id, this._user._user.id)
            .then(res => {
                this._utils.showToast("Promotion successfully shared");
            })
    }

    submitLike() {
        this.likeable = false;

        this._promo.submitLike(this.promo.id, this._user._user.id)
            .then(res => {
                this._utils.showToast("Promotion successfully liked");
            });
    }

    checkLikeable() {
        this._promo.isLikable(this.promo.id, this._user._user.id)
            .then(liked => {
                this.likeable = !liked;
            });
    }

    submitComment() {
        if (this.promocomment != "") {
            this.postLoading = true;

            this._promo.submitComment(this.promocomment, this.promo.id, this._user._user.id)
                .then(res => {
                    this.promocomment = "";
                    this.postLoading = false;
                });
        } else {
            console.log("Nothing in comment box");
        }
    }

}
