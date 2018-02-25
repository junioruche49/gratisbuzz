import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdsPage } from './ads';
import { ComponentsModule } from './../../components/components.module';

@NgModule({
  declarations: [
    AdsPage,
  ],
  imports: [
    IonicPageModule.forChild(AdsPage),
    ComponentsModule
  ],
  exports: [
      AdsPage
  ]
})
export class AdsPageModule {}
