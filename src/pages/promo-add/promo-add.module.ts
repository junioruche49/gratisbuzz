import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PromoAddPage } from './promo-add';
import { ComponentsModule } from './../../components/components.module';

@NgModule({
  declarations: [
    PromoAddPage,
  ],
  imports: [
    IonicPageModule.forChild(PromoAddPage),
    ComponentsModule
  ],
})
export class PromoAddPageModule {}
