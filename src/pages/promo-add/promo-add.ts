import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';
import { Utils } from '../../providers/utils/utils';
import { Brand } from './../../providers/brand/brand';

@IonicPage()
@Component({
    selector: 'page-promo-add',
    templateUrl: 'promo-add.html',
})
export class PromoAddPage {

    header = "Add new Promotion"

    brand = null;
    newPromo: any = {
        image: 'assets/img/add_image.png',
        newImages: [],
        location: [],
    };

    categories: any = null;
    allStates: any = null;
    states: any = [];
    lgas: any = [];

    category = "";
    state = "";
    lga = "";

    edit_id = 0;
    promo = null;

    constructor(
        public viewCtrl: ViewController,
        public navParams: NavParams,
        public utils: Utils,
        public _brand: Brand,
    ) {
        this.brand = this.navParams.get("brand");

        this.loadCategories();
        this.loadStates();

        this.newPromo.startDate = new Date().toISOString();

        this.edit_id = this.navParams.get("edit_id") || 0;

        if (this.edit_id) {
            console.log("Promo adding in edit mode");
            console.log(this.navParams.get("promo"));
            this.newPromo = this.navParams.get("promo") || {};
            this.header = "Edit Promo: " + this.newPromo.description;

            // this.newPromo.lga = this.newPromo.location.split(',')[0].trim();
            // this.newPromo.state = this.newPromo.location.split(',')[1].trim();

            this.newPromo.newImages = this.newPromo.images || [];
        }
    }

    _loadEditStates() {
        if (this.edit_id) {
            console.log("set state -- ");
            console.log(this.newPromo.state)
            this.state = this.newPromo.state;
            console.log(this.state)
            this.loadLgas(this.state);
            this.lga = this.newPromo.lga;
        }
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad PromoAddPage');
    }

    getFile() {
        console.log("getting file");
        (<HTMLInputElement>document.getElementById('filePInput')).click();
    }
    onFileChange(e) {
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length)
            return;
        this.createImage(files[0]);
    }
    createImage(file) {
        let reader = new FileReader();
        reader.onload = (e: any) => {
            this.newPromo.newImages.push(e.target.result);
        };
        reader.readAsDataURL(file);
    }
    removeImage(image) {
        this.newPromo.newImages.forEach((element, i) => {
            if (element === image) {
                this.newPromo.newImages.splice(i, 1);
                return;
            }
        });
    }

    loadCategories() {
        this.utils.getStoredValue("business")
            .then(categories => {
                this.categories = categories;
                console.log(categories);
            })
    }
    loadStates() {
        this.utils.getStoredValue("states")
            .then(states => {
                this.states = states;
                console.log(states);
            })

        this.utils.getStoredValue("allStates")
            .then(allStates => {
                this.allStates = allStates;
                console.log(allStates);
                this.loadLgas(this.state);

                if (this.edit_id) {
                    this._loadEditStates();
                }
            })
    }
    loadLgas(state) {
        var lgas = [];

        if (this.allStates.hasOwnProperty(state)) {
            this.allStates[state].forEach(place => {
                lgas.push(place);
            });
        }
        this.lgas = lgas;
    }
    setLocation(lga) {
        var newLocation = lga.trim() + ", " + this.state.trim();
        var added = false;
        this.newPromo.location.forEach(location => {
            if(location === newLocation){
                console.log("dont add location");
                added = true;
                return true;
            }
        });

        if(!added){
            this.newPromo.location.push(newLocation);
        }
        console.log(this.newPromo.location);
    }
    removeLocation(location){
        this.newPromo.location.forEach((l, index) => {
            if(l === location){
                this.newPromo.location.splice(index, 1);
                return false;
            }
        });
    }

    _confirmNewPromo() {
        let message: any = false;
        if (!this.newPromo.description) message = "Please provide a promotion title";
        if (!this.newPromo.short_description) message = "Please provide a promotion description";
        if (!this.newPromo.category) message = "Please provide a promotion category";
        if (this.newPromo.location.length < 1) message = "Please provide a location";
        // if (!this.lga) message = "Please select an LGA";

        if (!this.edit_id) {
            if (!this.newPromo.length) message = "Please specify how long";
            if (!this.newPromo.startDate) message = "Please provide a start date";
        }

        return message
    }

    submitPromo() {

        let issue = this._confirmNewPromo();
        if (issue) {
            this.utils.showToast(issue);
            return false;
        }

        if (this.edit_id) {

            this.utils.startLoading("Updating Promotion...");
            this._brand.editPromo(this.newPromo)
                .then(promo => {
                    console.log(promo);
                    this.utils.stopLoading();
                    this.viewCtrl.dismiss()
                        .then(() => {
                            this.utils.showToast("Successfully updated Promotion");
                        })
                })

        } else {

            this.utils.startLoading("Adding Promotion...");
            this._brand.submitPromo(this.newPromo, this.brand)
                .then(promo => {
                    console.log("submit promo");
                    console.log(promo);
                    this.viewCtrl.dismiss()
                        .then(() => {
                            this.utils.stopLoading();
                            this.utils.showToast("Successfully created new promotion for " + this.brand.name);
                        })

                })
        }
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

}
