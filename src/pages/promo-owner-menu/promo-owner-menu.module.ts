import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PromoOwnerMenuPage } from './promo-owner-menu';

@NgModule({
  declarations: [
    PromoOwnerMenuPage,
  ],
  imports: [
    IonicPageModule.forChild(PromoOwnerMenuPage),
  ],
})
export class PromoOwnerMenuPageModule {}
