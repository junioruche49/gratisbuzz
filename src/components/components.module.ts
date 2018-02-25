import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { DirectivesModule } from './../directives/directives.module';
import { ShowImagesComponent } from './show-images/show-images';
import { BrandItemComponent } from './brand-item/brand-item';
import { ImagePopComponent } from './image-pop/image-pop';
import { PromoItemComponent } from './promo-item/promo-item';
import { AdItemComponent } from './ad-item/ad-item';
import { CommentBoxComponent } from './comment-box/comment-box';
import { MomentModule } from 'angular2-moment';

@NgModule({
	declarations: [
        ShowImagesComponent,
        BrandItemComponent,
        ImagePopComponent,
        PromoItemComponent,
        AdItemComponent,
        CommentBoxComponent,
    ],
	imports: [IonicModule, DirectivesModule, MomentModule],
	exports: [
        ShowImagesComponent,
        BrandItemComponent,
        ImagePopComponent,
        PromoItemComponent,
        AdItemComponent,
        CommentBoxComponent,
    ]
})
export class ComponentsModule {}
