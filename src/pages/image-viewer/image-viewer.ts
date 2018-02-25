import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'page-image-viewer',
    templateUrl: 'image-viewer.html',
})
export class ImageViewerPage {

    image: any = '';
    images = [];
    initial = 0;

    constructor(
        public navParams: NavParams,
        public viewCtrl: ViewController,
    ) {}

    ionViewDidLoad() {
        console.log('ionViewDidLoad ImageViewerPage');
    }

    ionViewWillEnter() {
        this.images = [];
        this.image = '';

        const imgProp = this.navParams.get('images') || false;
        this.initial = this.navParams.get('initial') || 0;

        if (imgProp.constructor === Array) {
            this.images = imgProp;
            if (this.images.length == 1) {
                this.image = this.images[0];
            }
        } else {
            this.image = imgProp;
        }
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

}
