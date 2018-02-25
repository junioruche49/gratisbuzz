import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController, MenuController } from 'ionic-angular';
import { User } from '../../providers/user/user';
import { Utils } from '../../providers/utils/utils';
import { MainPage } from '../pages';

@IonicPage()
@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
})
export class LoginPage {
    account: { email: string, password: string } = {
        email: '',
        password: ''
    };
    terms = false;
    loading = false;
    loadingModal: any;

    // Our translated text strings
    private loginErrorString: string;

    constructor(
        public navCtrl: NavController,
        public modalCtrl: ModalController,
        public menuCtrl: MenuController,
        public user: User,
        public utils: Utils,
    ) {
        this.menuCtrl.enable(false);
        this.loginErrorString = "Unable to sign in. Please check your account information and try again.";
    }

    doLogin() {
        this.utils.startLoading("Logging in... Please wait");

        this.user.login(this.account)
            .subscribe((res: any) => {
                this.utils.stopLoading();
                console.log(res);

                if (res.status == 'success') {
                    this.navCtrl.setRoot(MainPage);
                    this.menuCtrl.enable(true);
                } else {
                    this.utils.showToast(res.message);
                }

            }, (err) => {
                this.utils.stopLoading();
                this.utils.showToast(this.loginErrorString);
            });
    }

    openModal(contentname) {
        this.modalCtrl.create('ContentPage', { content_name: contentname }).present();
    }

    gotoSignup() {
        this.navCtrl.push('SignupPage');
    }

    forgotPassword() {
        let url = "http://admin.gratisbuzz.com/password/reset";

        this.utils.openLink(url);
    }
}
