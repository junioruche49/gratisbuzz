import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Searchbar } from 'ionic-angular';
import { Utils, Brand } from '../../providers/providers';

@IonicPage({
    defaultHistory: ['TabsPage']
})
@Component({
    selector: 'page-brands',
    templateUrl: 'brands.html',
})
export class BrandsPage {

    showSearch = false;
    @ViewChild('searchbar') searchbar: Searchbar;

    brands: any = null;
    filterargs: any;

    constructor(
        public navCtrl: NavController,
        public modalCtrl: ModalController,
        public navParams: NavParams,
        public utils: Utils,
        public _brand: Brand,
    ) {
    }

    ionViewWillEnter(){
        console.log("here many");
        this.getBrands();
    }

    gotoBrand(brand) {
        this.modalCtrl.create("BrandDetailsPage", { id: brand, brand }).present();
    }
    getItems(ev) {
        let val = ev.target.value;

        this.filterargs = { name: val };
    }

    openSearch(){
        this.showSearch = true;
        setTimeout(()=>{
            this.searchbar.setFocus();
        }, 50);
    }
    cancelSearch(ev){
        this.showSearch = false;
        this.filterargs = null;
    }

    getBrands() {
        if(this.brands === null){
            this.utils.startLoading("Fetching brands");
        }

        this._brand.getData()
            .then(brands => {
                this.brands = brands;
                console.log(brands)
                this.utils.stopLoading();
            })
    }

}
