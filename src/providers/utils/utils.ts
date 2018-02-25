import { Storage } from '@ionic/storage';
import { ToastController, LoadingController, Platform } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Api } from '../api/api';
import { Settings } from './../settings/settings';
import { User } from '../user/user';

@Injectable()
export class Utils {

    _loadingModal: any = null;
    _isLoadingModal = false;

    link_ad_type = null;
    link_ad_id = null;

    referer_flag = "";

    constructor(
        private toastCtrl: ToastController,
        private loadingCtrl: LoadingController,
        private _socialSharing: SocialSharing,
        public api: Api,
        public _user: User,
        public settings: Settings,
        public storage: Storage,
        public platform: Platform,
    ) {
        console.log('Hello ToastProvider Provider');
    }

    showToast(message, position = "top", duration = 4000) {
        let toast = this.toastCtrl.create({
            message: message,
            duration: duration,
            position: position
        });
        toast.present();
    }

    startLoading(text = "Please wait") {

        if (!this._isLoadingModal) {
            this._isLoadingModal = true;
            this._loadingModal = this.loadingCtrl.create({
                content: text
            });
            this._loadingModal.present();
        } else {
            this._loadingModal.setContent(text);
        }
    }

    stopLoading() {
        if (this._isLoadingModal) {
            this._isLoadingModal = false;
            this._loadingModal.dismiss();
        }
    }

    setLinkMetas(ad_type, ad_id){
        this.link_ad_type = ad_type;
        this.link_ad_id = ad_id;
    }
    trackLink(link_url="", link_type="link"){
        if(this.link_ad_type && this.link_ad_id){

            var postdata = {link_type: link_type, link_url: link_url};

             console.log(postdata);
             console.log(this._user._user.id);

            this.api.post("track/link/"+this.link_ad_type+"/"+this.link_ad_id+"/"+this._user._user.id, postdata)
                .subscribe(res => {
                    console.log("Tracking a link  click ooo");
                    console.log(res);
                })
        }
    }

    openLink(link, link_type="link") {
        this.trackLink(link, link_type);

        window.open(link, '_blank', 'location=yes');
    }

    openCall(number) {
        this.trackLink(number, "phone");

        window.open("tel:" + number);
    }

    openEmail(email) {
        this.trackLink(email, "email");
        window.open("mailto:" + email);
    }

    share(options, success = "Successfully shared") {
        console.log(options);
        this._socialSharing.shareWithOptions(options)
            .then(() => {
                this.showToast(success);
            }).catch(() => {
                this.showToast("Something went wrong");
            });
    }

    loadBusinessData() {
        return new Promise((resolve, reject) => {

            this.getStoredValue("business")
                .then(data => {
                    if (data) {
                        resolve(data);
                        return this._fetchBusinessSettings().then(bus => {
                            resolve(bus);
                        })
                    } else {
                        return this._fetchBusinessSettings().then(bus => {
                            resolve(bus);
                        })
                    }
                })
        })

    }

    loadStateData() {
        return new Promise((resolve, reject) => {
            this.getStoredValue("states")
                .then(data => {
                    if (data) {
                        resolve(data);
                        return this._fetchStateSettings().then(states => {
                            resolve(states);
                        })
                    } else {
                        return this._fetchStateSettings().then(states => {
                            resolve(states);
                        })
                    }
                })
        })
    }

    _fetchBusinessSettings() {
        //NOTE: STORE LAST FETCH IN SETTINGS
        return new Promise((resolve, reject) => {
            this.api.get("getBusinessCategories")
                .subscribe(data => {
                    this.setStoredValue("business", data);
                    resolve(data);
                });
        });
    }

    _fetchStateSettings() {
        return new Promise((resolve, reject) => {
            this.api.get("getStates")
                .subscribe(allStates => {
                    this.setStoredValue("allStates", allStates);

                    let states = [];

                    for (var state in allStates) {
                        if (allStates.hasOwnProperty(state)) {
                            states.push(state);
                        }
                    }
                    this.setStoredValue("states", states);
                    resolve(allStates);
                });
        });
    }

    getOnlyStates() {
        return this.getStoredValue("states").then(state => state);
    }

    setStoredValue(key: string, value: any) {
        return this.storage.set(key, value);
    }
    getStoredValue(key: string) {
        return this.storage.get(key)
            .then(settings => {
                return settings;
            });
    }
}
