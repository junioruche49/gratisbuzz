import { ModalController } from 'ionic-angular';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'show-images',
    templateUrl: 'show-images.html'
})
export class ShowImagesComponent {

    @Input("images") images;
    singleImage = null;
    multipleImage = null;

    constructor(
        private modalCtrl: ModalController
    ) {}

    ngAfterViewInit(){
        setTimeout(() => {
            console.log(this.images);
            if(this.images.constructor === Array ){
                if( this.images.length === 1){
                    this.singleImage = this.images[0] || this.images;
                }else{
                    this.multipleImage = this.images;
                }
            }else{
                this.singleImage = this.images;
            }
        })
    }

    openImagesViewer(index=0) {
        console.log("Opening image viewer")
        console.log(index);
        this.modalCtrl.create('ImageViewerPage', {images: this.images, initial: index}).present();
    }

}
