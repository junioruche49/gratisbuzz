import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdDetailsPage } from './ad-details';
import { ComponentsModule } from './../../components/components.module';
import { MomentModule } from 'angular2-moment';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    AdDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(AdDetailsPage),
    ComponentsModule,
    PipesModule,
    MomentModule,
  ],
  exports: [
      AdDetailsPage
  ]
})
export class AdDetailsPageModule {}
