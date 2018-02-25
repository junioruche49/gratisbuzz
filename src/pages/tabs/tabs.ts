import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { Tab1Root, Tab2Root, Tab3Root, Tab4Root, Tab5Root } from '../pages';

import { User } from './../../providers/user/user';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root: any = Tab1Root;
  tab2Root: any = Tab2Root;
  tab3Root: any = Tab3Root;
  tab4Root: any = Tab4Root;
  tab5Root: any = Tab5Root;

  tab1Title = " ";
  tab2Title = " ";
  tab3Title = " ";
  tab4Title = " ";
  tab5Title = " ";

  constructor(public navCtrl: NavController, private User: User) {
    this.tab1Title = "Home";
    this.tab2Title = "Ads";
    this.tab3Title = "Win";
    this.tab4Title = "Brands";
    this.tab5Title = "Profile";
  }

  ionViewCanEnter() {
    return this.User.isLoggedIn();
  }
}
