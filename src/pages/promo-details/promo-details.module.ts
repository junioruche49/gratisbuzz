import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PromoDetailsPage } from './promo-details';
import { ComponentsModule } from './../../components/components.module';
import { MomentModule } from 'angular2-moment';

@NgModule({
  declarations: [
    PromoDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(PromoDetailsPage),
    ComponentsModule,
    MomentModule,
  ],
  exports: [
      PromoDetailsPage
  ]
})
export class PromoDetailsPageModule {}
