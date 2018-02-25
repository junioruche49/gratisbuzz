import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BrandOwnerPage } from './brand-owner';
import { ComponentsModule } from './../../components/components.module';

@NgModule({
  declarations: [
    BrandOwnerPage,
  ],
  imports: [
    IonicPageModule.forChild(BrandOwnerPage),
    ComponentsModule
  ],
})
export class BrandOwnerPageModule {}
