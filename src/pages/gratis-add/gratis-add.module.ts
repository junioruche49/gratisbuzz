import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GratisAddPage } from './gratis-add';
import { ComponentsModule } from './../../components/components.module';

@NgModule({
  declarations: [
    GratisAddPage,
  ],
  imports: [
    IonicPageModule.forChild(GratisAddPage),
    ComponentsModule
  ],
})
export class GratisAddPageModule {}
