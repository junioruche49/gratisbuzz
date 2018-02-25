import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BrandAddPage } from './brand-add';
import { ComponentsModule } from './../../components/components.module';

@NgModule({
    declarations: [
        BrandAddPage,
    ],
    imports: [
        IonicPageModule.forChild(BrandAddPage),
        ComponentsModule
    ],
    exports: [
        BrandAddPage,
    ]
})
export class BrandAddPageModule { }
