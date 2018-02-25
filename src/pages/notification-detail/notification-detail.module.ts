import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NotificationDetailPage } from './notification-detail';
import { PipesModule } from './../../pipes/pipes.module';
import { MomentModule } from 'angular2-moment';

@NgModule({
  declarations: [
    NotificationDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(NotificationDetailPage),
    PipesModule,
    MomentModule
  ],
  exports: [
      NotificationDetailPage
  ]
})
export class NotificationDetailPageModule {}
