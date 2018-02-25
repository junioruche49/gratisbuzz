import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User, Settings, Api } from '../../providers/providers';

@IonicPage()
@Component({
    selector: 'page-home',
    templateUrl: 'home.html',
})
export class HomePage {

    ads = [];
    slideOptions = {
        loop: true,
        autoplay: 100,
        autoplayDisableOnInteraction: false
    }
    notificationsNum = 0;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public user: User,
        private settings: Settings,
        public api: Api
    ) {
        this.getAds();
        this.getSettings();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad HomePage');
    }
    ionViewDidEnter(){
        console.log("get adssss");
        this.getAds();
    }

    getSettings() {
        this.api.get("getBusinessCategories")
            .subscribe(data => {
                // console.log(data);
                this.settings.setValue("business", data);
            });


        this.api.get("getStates")
            .subscribe(data => {
                this.settings.setValue("states", data);
            });
    }

    getAds() {
        this.api.get('ads')
            .subscribe((data: any) => {
                this.ads = data;
            });
    }

    gotoTab(s){
        console.log(s);
    }
    gotoPage(s){
        console.log(s);
    }

    openLink(s){
        console.log(s);
    }

}
