import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WinPage } from './win';

@NgModule({
  declarations: [
    WinPage,
  ],
  imports: [
    IonicPageModule.forChild(WinPage),
    ComponentsModule
  ],
})
export class WinPageModule {}
