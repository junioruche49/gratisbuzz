import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BrandDetailsPage } from './brand-details';
import { ComponentsModule } from './../../components/components.module';

@NgModule({
    declarations: [
        BrandDetailsPage,
    ],
    imports: [
        IonicPageModule.forChild(BrandDetailsPage),
        ComponentsModule
    ],
    exports: [
        BrandDetailsPage,
    ]
})
export class BrandDetailsPageModule { }
