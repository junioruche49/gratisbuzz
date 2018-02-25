import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams } from 'ionic-angular';
import { User } from '../../providers/user/user';
import { Utils } from '../../providers/utils/utils';
import { Api } from '../../providers/api/api';

@IonicPage({
    defaultHistory: ['HelpPage'],
    segment: 'content/:content_name'
})
@Component({
  selector: 'page-content',
  templateUrl: 'content.html'
})
export class ContentPage {

    content: any = { content: "" };
    loading: any = false;
    content_name: string;

    message: string = "";
    loadingModal: any;

    title: any = {
        "about": "About Us",
        "how": "How it Works",
        "faq": "Frequently Asked Questions",
        "contact": "Contact Us",
        "terms": "Terms and Condition",
        "privacy": "Privacy Policy",
    };

    header: string;

  constructor(
      public params: NavParams,
      public api: Api,
      public utils: Utils,
      public USER: User,
      public viewCtrl: ViewController,
    ) {
        this.content_name = this.params.get('content_name');
        this.header = this.title[this.content_name];

        this.getContent(this.content_name);
    }

    getContent(content_name) {
        this.utils.startLoading("Retrieving "+this.header+"... ");

        this.api.get("content/" + content_name)
            .subscribe((data: any) => {
                console.log(data);
                if (data.success) {
                    this.content = data.data;
                }

                this.utils.stopLoading();
            });
    }

    close() {
        this.viewCtrl.dismiss();
    }

    sendMessage() {
        if (this.message == '') {
            this.utils.showToast("Please write a message");
            return false;
        }

        this.utils.startLoading("Sending your message... Please wait...");

        this.api.post("contact_us/" + this.USER._user.id, { message: this.message })
            .subscribe((data: any) => {
                console.log(data);
                if (data.success) {
                    this.utils.showToast(data.message);
                    this.viewCtrl.dismiss();
                }
                this.utils.stopLoading();
            });
    }

}
