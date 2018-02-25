import { AlertController } from 'ionic-angular';
import { User } from './../../providers/user/user';
import { Component, Input } from '@angular/core';
import { Api } from '../../providers/api/api';
import { Utils } from '../../providers/utils/utils';

@Component({
    selector: 'comment-box',
    templateUrl: 'comment-box.html'
})
export class CommentBoxComponent {
    @Input('comment') comment = null;

    constructor(public user: User, public alertCtrl: AlertController, public api: Api, public _utils: Utils) {
        console.log('Hello CommentBoxComponent Component');
    }

    isMyComment(){
        return this.comment.user_id == this.user._user.id;
    }

    deleteComment(){
        console.log(this.comment);
        let confirm = this.alertCtrl.create({
            message: 'Are you sure you want to delete this comment?',
            buttons: [
                {
                    text: 'No',
                    handler: () => {
                        console.log('Disagree clicked');
                    }
                },
                {
                    text: 'Yes, Delete',
                    handler: () => {
                        console.log('Agree clicked');
                        var url = "";
                        if(this.comment.promo_id){
                            url = "promocomment/"+this.comment.id+"/delete";
                        }else{
                            url = "adcomment/"+this.comment.id+"/delete";
                        }
                        this.api.get(url)
                            .subscribe((data: any)=>{
                                this._utils.showToast(data.message);
                                this.comment.user = null;
                            })
                    }
                }
            ]
        });
        confirm.present();
    }

}
