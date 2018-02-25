import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Message } from '../../providers/message/message';

@IonicPage()
@Component({
    selector: 'page-notification',
    templateUrl: 'notification.html',
})
export class NotificationPage {

    messages: any = [];

    constructor(
        public navCtrl: NavController,
        public _message: Message
    ) {
        this.getMessages();
    }

    ionViewWillEnter() {
        console.log('ionViewDidLoad NotificationPage');
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

    isSeen(seen){
        return seen;
    }

    gotoDetails(message) {
        console.log("going to details")
        this._message.readMessage(message);
        this.navCtrl.push('NotificationDetailPage', {id:message.id, message});
    }

    getMessages() {
        this._message.init().getData()
            .then(messages => {
                console.log(messages);
                this.messages = messages
            })
    }

}
