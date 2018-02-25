import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController, MenuController, NavParams} from 'ionic-angular';

import { User, Settings, Utils } from '../../providers/providers';

@IonicPage({
    defaultHistory: ['WelcomePage'],
    segment: 'signup/:code'
})
@Component({
    selector: 'page-signup',
    templateUrl: 'signup.html'
})
export class SignupPage {

    account: { name: string, referal: string, username: string, email: string, phone: string, gender: string, location: string, status: string, password: string, cpassword: string } = {
        name: '',
        username: '',
        email: '',
        phone: '',
        gender: '',
        location: '',
        status: '',
        password: '',
        cpassword: '',
        referal: '',
    };

    terms = false;

    loading = false;
    loadingModal: any;
    allStates: any = null;
    states: any = [];
    lgas: any = [];

    newstate = "Lagos";
    newlga = "";

    // Our translated text strings
    private signupErrorString: string;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public modalCtrl: ModalController,
        public menuCtrl: MenuController,
        public user: User,
        public utils: Utils,
        public settings: Settings,) {

        this.menuCtrl.enable(false);

        this.signupErrorString = "Unable to create account. Please check your account information and try again.";

        this.utils.loadStateData().then(() => {
            this.utils.getStoredValue("states")
                .then(states => {
                    this.states = states;
                })

            this.utils.getStoredValue("allStates")
                .then(allStates => {
                    this.allStates = allStates;
                    this.loadLgas(this.newstate);
                })
        })

        var code = this.navParams.get('code') || null;
        if(code){
            this.account.referal = code;
            this.utils.referer_flag = code;
            console.log(code);
        }

    }

    doSignup() {
        let issue = this._confirmAccountInfo();
        if (issue) {
            this.utils.showToast(issue);
            return false;
        }

        this.utils.startLoading("Signing you up.. Please wait...");

        this.user.signup(this.account).subscribe((resp : any) => {
            this.utils.stopLoading();
            // this.utils.showToast("Successfully registered. Please confirm your email address by following the link we sent to your email: "+this.account.email, 'bottom', 8000);
            if (resp.status == 'success') {
                // code...
                this.utils.showToast("Successfully registered. You have been logged in", 'bottom', 8000);
            this.navCtrl.setRoot("TabsPage");
            }else{
                console.log(resp);
            }
            

            
            // this.navCtrl.push("LoginPage");
        }, (err) => {
            this.utils.stopLoading();
            this.account.password = "";
            this.account.cpassword = "";
            this.utils.showToast(this.signupErrorString);
        });
    }

    _confirmAccountInfo() {
        let message: any = false;
        if (!this.account.email) message = "Please provide a valid email address";
        if (!this.account.username) message = "Please provide a username";
        if (!this.account.name) message = "Please provide a full name";
        if (!this.account.phone) message = "Please provide a valid phone number";
        if (!this.account.gender) message = "Please tell us your gender";
        if (!this.account.status) message = "Please provide your status";
        if (!this.account.password) message = "Please provide a password";
        if (!this.account.location) message = "Please provide a location";

        return message
    }

    loadLgas(state) {
        var lgas = [];

        if (this.allStates.hasOwnProperty(state)) {
            this.allStates[state].forEach(place => {
                lgas.push(place);
            });
        }
        this.lgas = lgas;
    }

    setLocation(lga) {
        this.account.location = lga.trim() + ", " + this.newstate.trim();
        console.log(this.account.location);
    }

    openModal(contentname) {
        this.modalCtrl.create('ContentPage', { content_name: contentname }).present();
    }

    gotoLogin() {
        this.navCtrl.push('LoginPage');
    }
}
