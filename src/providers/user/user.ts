import { Platform } from 'ionic-angular';
import 'rxjs/add/operator/toPromise';

import { Injectable } from '@angular/core';

import { Api } from '../api/api';
import { Storage } from '@ionic/storage';

@Injectable()
export class User {
    _user: any;
    points = {
        count: 0
    };
    private USER_KEY: string = '_user';

    constructor(public api: Api, public storage: Storage, public platform: Platform) {
        console.log("User constructed");

        this.loadUser()
            .then(userFromStorage => {
                console.log("i am now in storage")
                console.log(userFromStorage);
                this._user = userFromStorage;
            })
    }

    //////////////////////////////////

    getPoints(){
        return new Promise((resolve, reject) => {
            this.api.get("track/get_points/" + this._user.id)
                .subscribe((points: any) => {
                    this.points.count = Number(points);
                    resolve(this.points);
                });
        })
    }

    submitBrand(newBrand){
        return new Promise((resolve, reject) => {
            this.api.post("addvendor/" + this._user.id, newBrand)
                .subscribe(brand => {
                    this.addVendor(brand);
                    resolve(brand);
                });
        })
    }

    editBrand(newBrand){
        let brand:any = {
            name: newBrand.name,
            short_description: newBrand.short_description,
            full_description: newBrand.full_description,
            email: newBrand.email,
            phone: newBrand.phone,
            category: newBrand.category,
            location: newBrand.location,
            website: newBrand.website,
            address: newBrand.address,
            twitter: newBrand.twitter,
            facebook: newBrand.facebook,
            instagram: newBrand.instagram,
            youtube: newBrand.youtube,
            store: newBrand.store,
            store2: newBrand.store2,
        }

        if(newBrand.image){
            brand.image = newBrand.image;
        }

        return new Promise((resolve, reject) => {
            this.api.post("editvendor/" + newBrand.id, brand)
                .subscribe(brand => {
                    this.updateVendor(brand);
                    resolve(brand);
                });
        })
    }

    updateProfile(key, value) {
        return new Promise((resolve, reject) => {
            this.api.post("users/" + this._user.id + "/edit", { key: key, value: value })
                .subscribe(res => {
                    this._user[key] = value;
                    this.enterUser(this._user);
                    resolve(res);
                    console.log(res);
                });
        })
    }


    ////////////////////////////////

    isLoggedIn() {
        if (this._user) {
            return this._user;
        } else {
            return false
        }
    }

    async loadUser() {
        let p = this.storage.get(this.USER_KEY)

        return await p;
    }

    enterUser(_user) {
        this.storage.set(this.USER_KEY, _user);
    }

    login(accountInfo: any) {
        let seq = this.api.post('loginuser', accountInfo)

        seq.subscribe((res: any) => {
            // If the API returned a successful response, mark the user as logged in
            if (res.status == 'success') {
                this._loggedIn(res);
                this.saveDeviceToken();
            } else {
            }
        }, err => {
            console.error('ERROR', err);
        });

        return seq;
    }

    /**
     * Send a POST request to our signup endpoint with the data
     * the user entered on the form.
     */
    signup(accountInfo: any) {
        let seq = this.api.post('signupuser', accountInfo)

        seq.subscribe((res: any) => {
            // If the API returned a successful response, mark the user as logged in
            if (res.status == 'success') {
                this._loggedIn(res);
            }
        }, err => {
            console.error('ERROR', err);
        });

        return seq;
    }

    addVendor(newVendor) {
        if(!this._user['vendor']){
            this._user['vendor'] = [];
        }
        console.log(this._user['vendor']);
        this._user['vendor'].push(newVendor);
        this.storage.set(this.USER_KEY, this._user);
    }

    updateVendor(newVendor) {
        this._user['vendor'].forEach((vendor, index) => {
            if (vendor.id == newVendor.id) {
                this._user['vendor'][index] = newVendor;
            }
        });
        this.storage.set(this.USER_KEY, this._user);
    }

    deleteVendor(newVendor) {
        this._user['vendor'].forEach((vendor, index) => {
            if (vendor.id == newVendor.id) {
               this._user['vendor'].splice(index, 1);
            }
        });
        this.storage.set(this.USER_KEY, this._user);
    }

    /**
     * Log the user out, which forgets the session
     */
    logout() {
        this.api.get("remove_token/"+this._user.id).subscribe();
        this._user = null;
        this.storage.set(this.USER_KEY, this._user);
    }

    /**
     * Process a login/signup response to store user data
     */
    _loggedIn(resp) {
        this._user = resp.user;
        this.storage.set(this.USER_KEY, this._user);
    }

    saveDeviceToken(){
        if (this.platform.is('cordova')) {
            window["plugins"].OneSignal.getIds((ids) => {
                var deviceToken = ids['userId'];
                if(this._user.id){
                    this.api.get("save_token/"+this._user.id+"/"+deviceToken).subscribe();
                }
            });
        }
        // var deviceToken = "ppsdoidi";
        //         this.api.get("save_token/"+this._user.id+"/"+deviceToken).subscribe();
    }
}
