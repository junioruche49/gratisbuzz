import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, AlertController, ModalController } from 'ionic-angular';
import { User } from '../../providers/user/user';
import { Utils } from '../../providers/utils/utils';
import { Api } from '../../providers/api/api';

@IonicPage()
@Component({
    selector: 'page-profile',
    templateUrl: 'profile.html',
})
export class ProfilePage {

    user: any = null;
    isChanging: boolean = false;
    change = "Change"
    vendors: any = [];
    page = 'account';

    constructor(
        public navCtrl: NavController,
        public alertCtrl: AlertController,
        public modalCtrl: ModalController,
        public navParams: NavParams,
        private app: App,
        private api: Api,
        public User: User,
        public utils: Utils,
    ) {
        if(this.User._user){
            this.user = this.User._user;
        }else{
            this.User.loadUser().then(user => {
                this.user = user;
            })
        }
    }

    ionViewWillEnter(){

    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ProfilePage');
    }

    getFile() {
        console.log("getting file");
        (<HTMLInputElement>document.getElementById('fileInput')).click();
    }
    onFileChange(e) {
        this.isChanging = true;
        this.change = "...loading";
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length)
            return;
        this.createImage(files[0]);
    }
    createImage(file) {
        let reader = new FileReader();
        let vm = this;
        reader.onload = (e: any) => {
            this.api.post("updatepicture/" + vm.user.id, { image: e.target.result })
                .subscribe((resp: any) => {
                    this.isChanging = false;
                    this.change = "Change";
                    this.utils.showToast(resp.message);
                    console.log(resp);
                    vm.user.image = resp.image;
                    this.User.enterUser(vm.user);
                });
        };
        reader.readAsDataURL(file);
    }

    logoutUser() {
        let confirm = this.alertCtrl.create({
            message: 'Are you sure you want to logout?',
            buttons: [
                {
                    text: 'No, Stay',
                    handler: () => {
                        console.log('Disagree clicked');
                    }
                },
                {
                    text: 'Yes, Logout',
                    handler: () => {
                        console.log('Agree clicked');
                        this.User.logout();
                        this.app.getRootNavs()[0].setRoot('WelcomePage', {}, { animate: true, direction: 'back' });
                    }
                }
            ]
        });
        confirm.present();
    }

    shareCode() {
        var options = {
            message: "Hey, sign up using this referral code " + this.user.referal + " to get awesome promotions in your area and win countless products and services from wonderful Brands on http://gratisbuzz.com/refer.php?code="+this.user.referal,
            subject: 'Come and win with Gratisbuzz',
            chooserTitle: 'Invite your Friends'
        }

        this.utils.share(options);
    }

    addBrand() {
        console.log("adding brand");
        let AVM = this.modalCtrl.create('BrandAddPage');

        AVM.present();
    }

    gotoBrand(brand){
        this.navCtrl.push('BrandOwnerPage', {id:brand.id, brand});
    }

    editSomething(key, value) {
        let editPrompt = this.alertCtrl.create({
            message: "Edit your " + key + "",
            inputs: [
                {
                    name: key,
                    placeholder: key,
                    value: value
                },
            ],
            buttons: [{
                text: 'Cancel', handler: data => {
                    console.log('Cancel clicked');
                }
            },{
                text: 'Save', handler: data => {
                    console.log(data);
                    this.updateProfile(key, data[key]);
                }}]
        });
        editPrompt.present();
    }

    updateProfile(key, value) {
        this.User.updateProfile(key, value)
            .then((res:any) => {
                this.utils.showToast(res.message);
            })
    }

}
