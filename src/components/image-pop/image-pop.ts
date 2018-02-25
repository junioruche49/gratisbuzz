import { ModalController } from 'ionic-angular';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'image-pop',
    templateUrl: 'image-pop.html'
})
export class ImagePopComponent {

    @Input("image") public image: String;

    constructor(
        private modalCtrl: ModalController
    ) { }

    popImage() {
        console.log("poping Image")
        this.modalCtrl
            .create('ImageViewerPage', { images: this.image })
            .present();
    }

}
