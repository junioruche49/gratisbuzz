import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'page-download',
    templateUrl: 'download.html',
})
export class DownloadPage {

    constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad DownloadPage');
    }

    gotoDownloadLink(){
        var link = "http://gratisbuzz.com/site/download.php";
        window.open(link, '_blank', 'location=yes');
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

}
