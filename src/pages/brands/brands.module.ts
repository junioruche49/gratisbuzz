import { PipesModule } from './../../pipes/pipes.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BrandsPage } from './brands';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
    declarations: [
        BrandsPage,
    ],
    imports: [
        IonicPageModule.forChild(BrandsPage),
        ComponentsModule,
        PipesModule
    ],
    exports: [
        BrandsPage
    ]
})
export class BrandsPageModule { }
