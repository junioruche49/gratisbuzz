import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Api } from '../../providers/providers';
import { Utils } from './../../providers/utils/utils';

@IonicPage()
@Component({
    selector: 'page-ad-search',
    templateUrl: 'ad-search.html',
})
export class AdSearchPage {


    businessCategories: any = [];

    allStates = [];
    states: any = [];
    lgas: any = [];

    search: any = {
        category: "All",
        location: "All, All",
    };

    newstate = "";
    newlga = "";

    constructor(
        public navCtrl: NavController,
        public params: NavParams,
        public viewCtrl: ViewController,
        public api: Api,
        public _utils: Utils
    ) {

        this._utils.getStoredValue("states")
            .then(states => {
                this.states = states;
                this.states.unshift("All");
                console.log(states);
            })

        this._utils.getStoredValue("allStates")
            .then(allStates => {
                this.allStates = allStates;
                console.log(allStates);
            })

        this._utils.getStoredValue("business")
            .then(categories => {
                this.businessCategories = categories;
                this.businessCategories.unshift("All");
                console.log(categories);
            })


        var s = this.params.get("search");
        if(s){
            this.newstate = s.state;
            this.newlga = s.lga;
            this.search.state = s.state;
            this.search.lga = s.lga;
            this.search.location = s.location;
            this.search.category = s.category;
        }

        // this.loadLgas(this.newstate);
        if (this.params.get("search")) {
            this.search.lga = s.lga;
            this.newlga = s.lga;
        }
    }
    ionViewDidLoad() {
        console.log('ionViewDidLoad AdSearchPage');
    }

    loadLgas(state) {
        var lgas = [];

        this.lgas = this.allStates[state];
        // this.states = state;
        this.search.state = state;
        lgas.unshift("All");
    }

    setLocation(lga) {
        // this.search.location = lga + ", " + this.newstate;
        this.search.lga = lga;
        this.search.state = this.newstate;
        console.log(this.search.location);
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

    selectSearch() {
        console.log(this.search);
        if(!this.search.category){
            this.search.category = "All";
        }
        if(!this.search.lga){
            this.search.lga = "All";
        }
        if(!this.search.state){
            this.search.state = "All";
        }

        this.search.location = this.search.lga.trim() + ", " + this.search.state.trim()

        this.viewCtrl.dismiss(this.search);
    }

}
