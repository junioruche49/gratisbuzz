import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';
import { Utils } from '../../providers/utils/utils';
import { Brand } from '../../providers/brand/brand';

@IonicPage()
@Component({
    selector: 'page-gratis-add',
    templateUrl: 'gratis-add.html',
})
export class GratisAddPage {

    header = "Add new Gratis Ad"

    brand = null;
    newAd: any = {
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
    ad = null;

    constructor(
        public viewCtrl: ViewController,
        public navParams: NavParams,
        public utils: Utils,
        public _brand: Brand,
    ) {
        this.brand = this.navParams.get("brand");

        this.loadCategories();
        this.loadStates();

        this.edit_id = this.navParams.get("edit_id") || 0;

        if (this.edit_id) {
            console.log("Ad adding in edit mode");
            console.log(this.navParams.get("ad"));
            this.newAd = this.navParams.get("ad") || {};
            this.header = "Edit Ad: " + this.newAd.description;
            this.newAd.lga = this.newAd.location.split(',')[0].trim();
            this.newAd.state = this.newAd.location.split(',')[1].trim();

            this.newAd.newImages = this.newAd.images || [];
        }
    }

    _loadEditStates() {
        if (this.edit_id) {
            this.state = this.newAd.state;

            this.loadLgas(this.state);
            this.lga = this.newAd.lga;

            console.log(this.newAd.category);
        }
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad AdAddPage');
    }

    getFile() {
        console.log("getting file");
        (<HTMLInputElement>document.getElementById('fileAInput')).click();
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
            this.newAd.newImages.push(e.target.result);
        };
        reader.readAsDataURL(file);
    }
    removeImage(image) {
        this.newAd.newImages.forEach((element, i) => {
            if (element === image) {
                this.newAd.newImages.splice(i, 1);
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
        this.newAd.location.forEach(location => {
            if(location === newLocation){
                console.log("dont add location");
                added = true;
                return true;
            }
        });

        if(!added){
            this.newAd.location.push(newLocation);
        }
        console.log(this.newAd.location);
    }
    removeLocation(location) {
        this.newAd.location.forEach((l, index) => {
            if (l === location) {
                this.newAd.location.splice(index, 1);
                return false;
            }
        });
    }

    _confirmNewAd() {
        let message: any = false;
        if (!this.newAd.how_to_claim) message = "Please provide instructions on how to claim";
        if (!this.newAd.incentive) message = "Please provide an incentive";
        if (!this.newAd.incentive_amt) message = "Please provide a value for the incentive";
        if (!this.newAd.selection_method) message = "Please provide a way to select winners";
        if (!this.newAd.possible_winners) message = "Please provide total number of possible winners";
        if (!this.lga) message = "Please select an LGA";
        if (!this.newAd.description) message = "Please provide a Gratis Ad title";
        if (!this.newAd.category) message = "Please provide a Gratis Ad category";
        if (!this.state) message = "Please provide a state";

        if (!this.edit_id) {
            // if (!this.newAd.length) message = "Please specify how long";
            // if (!this.newAd.startDate) message = "Please provide a start date";
        }

        return message
    }

    submitAd() {

        let issue = this._confirmNewAd();
        if (issue) {
            this.utils.showToast(issue);
            return false;
        }

        if (this.edit_id) {

            this.utils.startLoading("Updating brand...");
            this._brand.editAd(this.newAd)
                .then(ad => {
                    console.log(ad);
                    this.utils.stopLoading();
                    this.viewCtrl.dismiss()
                        .then(() => {
                            this.utils.showToast("Successfully updated Adtion");
                        })
                })

        } else {

            this.utils.startLoading("Adding Gratis Ad...");
            this._brand.submitAd(this.newAd, this.brand)
                .then(ad => {
                    console.log("submit ad");
                    console.log(ad);
                    this.viewCtrl.dismiss()
                        .then(() => {
                            this.utils.stopLoading();
                            this.utils.showToast("Successfully created new Gratis Ad for " + this.brand.name);
                        })

                })
        }
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

}
