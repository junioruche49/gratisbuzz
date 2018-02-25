import { Component, ViewChild } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { TranslateService } from '@ngx-translate/core';
import { Config, Nav, Platform, MenuController } from 'ionic-angular';

import { FirstRunPage, MainPage } from '../pages/pages';
import { Utils } from '../providers/utils/utils';
import { Settings } from '../providers/settings/settings';
import { User } from '../providers/user/user';
import { Api } from '../providers/api/api';
import { Message } from './../providers/message/message';

@Component({
    selector: 'page-app',
    templateUrl: 'app.html'
})
export class MyApp {
    rootPage = null;
    user: any = {
        image: '',
        name: ''
    };
    messageCount = {
        count: 0
    };
    pointsCount: any = {
        count: 0
    };

    @ViewChild(Nav) nav: Nav;

    pages: any[] = [
        { title: 'Home', component: 'TabsPage' },
        { title: 'Brands', component: 'BrandsPage' },
        { title: 'Ads', component: 'AdsPage' },
        { title: 'Win', component: 'WinPage' },
        { title: 'Notification', component: 'NotificationPage' },
        { title: 'Profile', component: 'ProfilePage' },
        { title: 'Winners', component: 'TabsPage' },
    ]

    constructor(
        private translate: TranslateService,
        public User: User,
        public _message: Message,
        public menuCtrl: MenuController,
        public utils: Utils,
        public api: Api,
        public platform: Platform, settings: Settings, private config: Config, private statusBar: StatusBar, private splashScreen: SplashScreen) {
        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            this.statusBar.styleDefault();
            this.statusBar.backgroundColorByHexString("#fcb903aa");
            this.splashScreen.hide();

            if (platform.is('cordova')) {
                console.log('I am on an adroid device');
                var notificationOpenedCallback = (jsonData) => {
                    console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
                    // alert("Notification received:\n" + JSON.stringify(jsonData));
                    utils.showToast(jsonData.notification.payload.body, "bottom");
                  };

                window["plugins"].OneSignal
                    .startInit("092e25e6-3d34-424b-a264-721b94777119", "1051179943105")
                    .handleNotificationOpened(notificationOpenedCallback)
                    .endInit();
            }
        });
        this.initTranslate();
        this.utils.loadBusinessData();
        this.utils.loadStateData();
        this.utils.startLoading();
        this.User.loadUser()
            .then(user => {
                this.utils.stopLoading();
                console.log(user);
                if(user){
                    this.user = user;
                    this.doSetup();
                    this.rootPage = MainPage;
                    this.menuCtrl.enable(true);
                    this.saveDeviceToken(user.id);
                }else{
                    if(!this.utils.referer_flag){
                        this.rootPage = FirstRunPage;
                    }
                    this.menuCtrl.enable(false);
                }
            })
    }

    saveDeviceToken(user_id){
        if (this.platform.is('cordova')) {
            window["plugins"].OneSignal.getIds((ids) => {
                var deviceToken = ids['userId'];
                this.api.get("save_token/"+user_id+"/"+deviceToken).subscribe();
            });
        }
    }

    //NOTE: make sidebar assesible only from the other pages

    doSetup(){
        console.log(this.user);
        this._message.init().getData()
            .then(data => {
                this.messageCount = this._message.getUnreadCount();
            })

        this.User.getPoints()
            .then(points => {
                console.log("Points--------");
                console.log(points);
                this.pointsCount = points;
            })
    }

    initTranslate() {
        // Set the default language for translation strings, and the current language.
        this.translate.setDefaultLang('en');

        if (this.translate.getBrowserLang() !== undefined) {
            this.translate.use(this.translate.getBrowserLang());
        } else {
            this.translate.use('en'); // Set your language here
        }
        this.config.set('ios', 'backButtonText', "");

    }

    openPage(page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    }
}
