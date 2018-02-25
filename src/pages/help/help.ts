import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Utils } from '../../providers/utils/utils';

@IonicPage()
@Component({
    selector: 'page-help',
    templateUrl: 'help.html',
})
export class HelpPage {
    pages: any[] = [
        { title: 'About Us', name: "about"},
        { title: 'How it Works', name: "how"},
        { title: 'FAQ', name: "faq"},
        { title: 'Terms and Conditions', name: "terms"},
        { title: 'Privacy Policy', name: "privacy"},
        { title: 'Contact Us', name: "contact"},
    ]
    constructor(
        public navCtrl: NavController,
        public utils: Utils
    ) {}

    ionViewDidLoad() {
        console.log('ionViewDidLoad HelpPage');
    }

    gotoContent(name){
        console.log(name);
        this.navCtrl.push('ContentPage', {content_name:name});
    }

    openLink(url){
        this.utils.openLink(url);
    }

}
