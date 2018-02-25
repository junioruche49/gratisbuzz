import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage({
    defaultHistory: ['NotificationPage'],
    segment: "message-details/:id"
})
@Component({
    selector: 'page-notification-detail',
    templateUrl: 'notification-detail.html',
})
export class NotificationDetailPage {

    message = null;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams
    ) {
        this.message = this.navParams.get("message");
        console.log(this.message);
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad NotificationDetailPage');
    }

    getColor(messageType, seen = 0) {
        if (seen) {
            return 'silver';
        }
        let color = 'silver';
        switch (messageType) {
            case 'info':
                color = 'blueColor';
                break;
            case 'warning':
                color = 'yellowColor';
                break;
            case 'promo':
                color = 'greenColor';
                break;
            case 'message':
                color = 'redColor';
                break;
            case 'win':
                color = 'winColor';
                break;
            default:
                break;
        }

        return color;
    }

    getIcon(messageType) {
        let icon = 'information';
        switch (messageType) {
            case 'info':
                icon = 'information';
                break;
            case 'warning':
                icon = 'warning';
                break;
            case 'promo':
                icon = 'star';
                break;
            case 'message':
                icon = 'quote';
                break;
            case 'win':
                icon = 'trophy';
                break;
            default:
                break;
        }

        return icon;
    }

}
