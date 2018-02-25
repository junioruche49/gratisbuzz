import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PromoOwnerStatsPage } from './promo-owner-stats';

@NgModule({
  declarations: [
    PromoOwnerStatsPage,
  ],
  imports: [
    IonicPageModule.forChild(PromoOwnerStatsPage),
  ],
})
export class PromoOwnerStatsPageModule {}
