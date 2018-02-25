import { Utils } from './../../providers/utils/utils';
import { Component } from '@angular/core';
import { IonicPage, NavController, MenuController } from 'ionic-angular';
import { User } from './../../providers/user/user';

/**
 * The Welcome Page is a splash page that quickly describes the app,
 * and then directs the user to create an account or log in.
 * If you'd like to immediately put the user onto a login/signup page,
 * we recommend not using the Welcome page.
*/
@IonicPage()
@Component({
    selector: 'page-welcome',
    templateUrl: 'welcome.html'
})
export class WelcomePage {

    constructor(
        public navCtrl: NavController,
        public menuCtrl: MenuController,
        public user: User,
        public utils: Utils,
    ) {
        this.menuCtrl.enable(false);
     }

    login() {
        this.navCtrl.push('LoginPage');
    }

    signup() {
        this.navCtrl.push('SignupPage');
    }
}
