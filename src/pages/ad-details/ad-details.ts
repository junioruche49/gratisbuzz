import { Utils } from './../../providers/utils/utils';
import { Gratis } from './../../providers/gratis/gratis';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController, Platform } from 'ionic-angular';
import { User } from '../../providers/user/user';

@IonicPage({
    defaultHistory: ['AdsPage'],
    segment: 'ad-detail/:id'
})
@Component({
    selector: 'page-ad-details',
    templateUrl: 'ad-details.html',
})
export class AdDetailsPage {

    ad = null;
    livead = null;
    question = null;
    user_image = null;
    likeable = true;
    adcomment = "";
    postLoading = false;
    answer: null;
    answered = false;
    question_show = 0;
    checkTime = null;

    constructor(
        public navCtrl: NavController,
        public modalCtrl: ModalController,
        public alertCtrl: AlertController,
        public socialSharing: SocialSharing,
        public navParams: NavParams,
        public _user: User,
        public _utils: Utils,
        public _ad: Gratis,
        public platform: Platform
    ) {
        this.ad = this.navParams.get("ad");
        this.livead = this.navParams.get("livead") || null;
        this.question = this.navParams.get("question") || null;

        console.log(this.ad);
        console.log(this.question);
        this.user_image = this._user._user.image;
        this.loadLatestAd();
        this.checkAnswered();
        this.shouldShowQuestion();
    }

    loadLatestAd(){
        if(!this.livead) return;
        this._ad.loadLatest(this.ad.id)
            .then(latestAd => {
                this.ad = latestAd;
            })
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad AdDetailsPage');
        this.checkLikeable();
        this._ad.view(this.ad.id, this._user._user.id);
        this._utils.setLinkMetas('ad', this.ad.id);
    }

    ionViewDidEnter(){
        if(!this.livead) return;

        this.checkTime = setInterval(() => {
            this.shouldShowQuestion();
        }, 1000);
    }
    ionViewDidLeave(){
        if(!this.livead) return;

        clearInterval(this.checkTime);
    }

    checkAnswered(){
        if(!this.livead) return;

        this._ad.isQuestionAnswered(this.livead.id, this._user._user.id)
            .then((res:any) => {
                this.answered = res;
            })
    }

    gotoBrand(){
        this.modalCtrl.create('BrandDetailsPage', {id:this.ad.vendor.id, brand:this.ad.vendor}).present();
    }

    share() {
        var shareBegin = new Date();

        this.socialSharing.share(
            "At the Gratisbuzz App - " + this.ad.vendor.name + " - " + this.ad.description + ". Possible Winners => "+this.livead.possible_winners+ ". Incentive => "+this.livead.incentive,
            this.ad.description, "", "http://gratisbuzz.com/site/promo.php?type=ad&id="+this.ad.id)
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
            }).catch(() => {
                this._utils.showToast("Sorry something is not right");
            });
    }
    submitShare() {
        this._ad.submitShare(this.ad.id, this._user._user.id)
            .then(res => {
                this._utils.showToast("Gratis Ad successfully shared");
            })
    }

    submitLike() {
        this.likeable = false;

        this._ad.submitLike(this.ad.id, this._user._user.id)
            .then(res => {
                this._utils.showToast("Gratis Ad successfully liked");
            });
    }

    checkLikeable() {
        this._ad.isLikable(this.ad.id, this._user._user.id)
            .then(liked => {
                this.likeable = !liked;
            });
    }

    submitComment() {
        if (this.adcomment != "") {
            this.postLoading = true;

            this._ad.submitComment(this.adcomment, this.ad.id, this._user._user.id)
                .then(res => {
                    this.adcomment = "";
                    this.postLoading = false;
                });
        } else {
            console.log("Nothing in comment box");
        }
    }

    shouldShowQuestion(){
        if(!this.livead) return;

        var q_begin = new Date(this.livead.question_begin);
        var q_end = new Date(this.livead.end);
        var now = new Date();

        console.log(q_begin);
        console.log(now);
        console.log(q_end);

        if(now.getTime() >= q_begin.getTime()){
            this.question_show = 1;
            if(now.getTime() > q_end.getTime()){
                this.question_show = 2;
                clearInterval(this.checkTime);
            }
        }else{
            this.question_show = 0;
        }

        console.log(this.question_show);
    }

    confirmSubmitAnswer(){
        let title = "";
        let message = "";
        if (this.question.type == "theory") {
            title = "Are you sure you want to choose this answer?"
            message = this.answer;
        } else {
            title = this.question["option_"+this.answer];
            message = "Are you sure you want to choose this answer?"
        }

        let alert = this.alertCtrl.create({
            title: title,
            message: message,
            buttons: [
                {
                    text: 'No',
                    role: 'cancel',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Yes',
                    handler: () => {
                        console.log('You selected option ' + this.answer);
                        this.submitAnswer();
                    }
                }
            ]
        });
        alert.present();
    }

    submitAnswer(){
        if(!this.livead.id) return;

        this._ad.submitAnswer(this.livead.id, this.answer, this._user._user.id)
            .then((res:any)=>{
                this._utils.showToast(res.message);
                this.answered = true;
            })
    }

}
