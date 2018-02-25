import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BrandOwnerMenuPage } from './brand-owner-menu';

@NgModule({
  declarations: [
    BrandOwnerMenuPage,
  ],
  imports: [
    IonicPageModule.forChild(BrandOwnerMenuPage),
  ],
  exports: [
      BrandOwnerMenuPage
  ]
})
export class BrandOwnerMenuPageModule {}
