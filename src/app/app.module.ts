import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MomentModule } from 'angular2-moment';
import { OneSignal } from '@ionic-native/onesignal';
import { Pro } from '@ionic/pro';

import { Camera } from '@ionic-native/camera';
import { SocialSharing } from '@ionic-native/social-sharing';


import { IonicStorageModule, Storage } from '@ionic/storage';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { DirectivesModule } from './../directives/directives.module';

import { Items } from '../mocks/providers/items';
import { Settings } from '../providers/providers';
import { User } from '../providers/providers';
import { Api } from '../providers/providers';
import { MyApp } from './app.component';
import { Utils } from '../providers/utils/utils';
import { Brand } from '../providers/brand/brand';
import { ComponentsModule } from './../components/components.module';
import { PipesModule } from './../pipes/pipes.module';
import { Model } from '../providers/model/model';
import { Message } from '../providers/message/message';
import { Promos } from '../providers/promos/promos';
import { Gratis } from '../providers/gratis/gratis';

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function provideSettings(storage: Storage) {
    /**
     * The Settings provider takes a set of default settings for your app.
     *
     * You can add new settings options at any time. Once the settings are saved,
     * these values will not overwrite the saved values (this can be done manually if desired).
     */
    return new Settings(storage, {});
}

Pro.init('b7dd2379', {
  appVersion: '1.2.0'
})

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
        BrowserModule,
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]
            }
        }),
        IonicModule.forRoot(MyApp, {
            backButtonText: ' ',
            backButtonIcon: 'ios-arrow-back',
            mode: 'md'
        }),
        IonicStorageModule.forRoot(),
        ComponentsModule,
        DirectivesModule,
        PipesModule,
        MomentModule,
    ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
        Api,
        Items,
        User,
        Camera,
        SplashScreen,
        StatusBar,
        OneSignal,
        SocialSharing,
        { provide: Settings, useFactory: provideSettings, deps: [Storage] },
        // Keep this to enable Ionic's runtime error handling during development
        { provide: ErrorHandler, useClass: IonicErrorHandler },
        Utils,
        Brand,
        Model,
        Message,
        Promos,
        Gratis
    ]
})
export class AppModule {}
