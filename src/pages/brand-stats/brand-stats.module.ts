import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BrandStatsPage } from './brand-stats';

@NgModule({
  declarations: [
    BrandStatsPage,
  ],
  imports: [
    IonicPageModule.forChild(BrandStatsPage),
  ],
})
export class BrandStatsPageModule {}
