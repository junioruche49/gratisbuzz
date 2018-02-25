// import { FormBuilder, FormGroup } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams } from 'ionic-angular';
import { Utils } from './../../providers/utils/utils';
import { User } from './../../providers/user/user';

@IonicPage({
    defaultHistory: ['ProfilePage']
})
@Component({
    selector: 'page-brand-add',
    templateUrl: 'brand-add.html',
})
export class BrandAddPage {

    header = "Add New Brand"

    categories: any = null;
    allStates: any = null;
    states: any = [];
    lgas: any = [];

    category = "";
    state = "";
    lga = "";

    newBrand: any = {};

    edit_id = 0;

    // newBrandForm: FormGroup;

    constructor(
        public viewCtrl: ViewController,
        public navParams: NavParams,
        public utils: Utils,
        public user: User,
        // public formBuilder: FormBuilder
    ) {
        this.loadCategories();
        this.loadStates();

        this.edit_id = this.navParams.get("edit_id") || 0;

        if (this.edit_id) {
            this.newBrand = this.navParams.get("brand") || {};
            this.header = "Edit " + this.newBrand.name;
            this.newBrand.lga = this.newBrand.location.split(',')[0].trim();
            this.newBrand.state = this.newBrand.location.split(',')[1].trim();
        }
    }

    _loadEditStates() {
        if (this.edit_id) {
            console.log("set state -- ");
            console.log(this.newBrand.state)
            this.state = this.newBrand.state;
            console.log(this.state)
            this.loadLgas(this.state);
            this.lga = this.newBrand.lga;
        }
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
        this.newBrand.location = lga.trim() + ", " + this.state;
        console.log(this.newBrand.location);
    }

    _confirmNewBrand() {
        let message: any = false;
        if (!this.lga) message = "Please select an LGA";
        if (!this.newBrand.image) message = "Please upload a brand logo";
        if (!this.newBrand.name) message = "Please provide a brand name";
        // if (!this.newBrand.short_description) message = "Please provide a short description";
        if (!this.newBrand.full_description) message = "Please provide a description";
        if (!this.newBrand.email) message = "Please provide an email address";
        if (!this.newBrand.phone) message = "Please provide a phone number";
        if (!this.newBrand.category) message = "Please select a category";

        return message
    }

    submitBrand() {

        let issue = this._confirmNewBrand();
        if (issue) {
            this.utils.showToast(issue);
            return false;
        }

        if (this.edit_id) {
            if (this._isURL(this.newBrand.image)) {
                delete this.newBrand.image
            }

            this.utils.startLoading("Updating brand...");
            this.user.editBrand(this.newBrand)
                .then(brand => {
                    console.log(brand);
                    this.utils.stopLoading();
                    this.viewCtrl.dismiss()
                        .then(() => {
                            this.utils.showToast("Successfully updated brand");
                        })
                })

        } else {
            this.utils.startLoading("Adding brand...");
            this.user.submitBrand(this.newBrand)
                .then(brand => {
                    console.log(brand);
                    this.utils.stopLoading();
                    this.viewCtrl.dismiss()
                        .then(() => {
                            this.utils.showToast("Successfully created new brand");
                        })

                })
        }

    }

    getFile() {
        console.log("getting file");
        (<HTMLInputElement>document.getElementById('fileVInput')).click();
    }
    onFileChange(e) {
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length)
            return;
        this.createImage(files[0]);
    }
    createImage(file) {
        let reader = new FileReader();
        let vm = this;
        reader.onload = (e: any) => {
            vm.newBrand.image = e.target.result;
        };
        reader.readAsDataURL(file);
    }

    dismiss(payload = {}) {
        this.viewCtrl.dismiss(payload);
    }
    _isURL(str) {
        var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
        return pattern.test(str);
    }

}
