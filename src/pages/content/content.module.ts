import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContentPage } from './content';
import { PipesModule } from './../../pipes/pipes.module';

@NgModule({
  declarations: [
    ContentPage,
  ],
  imports: [
    IonicPageModule.forChild(ContentPage),
    PipesModule
  ],
  exports: [
    ContentPage
  ]
})
export class ContentPageModule { }
