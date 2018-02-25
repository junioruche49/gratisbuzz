import { User } from './../user/user';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Api } from './../api/api';
import { Model } from './../model/model';

@Injectable()
export class Message extends Model {

    model = "messages";
    unread = {
        count: 0
    };

    constructor(public api: Api, public user: User) {
        super(api, user);
    }

    init(){
        if(this.user._user){
            this.model = `${this.model}/${this.user._user.id}`;
            this.getUnreadCount();
        }

        return this;
    }

    getUnreadCount(){
        let counter = 0;
        if(this.data){
            this.data.forEach(message => {
                if(!message.seen){
                    counter++;
                }
            });
        }

        this.unread.count = counter;
        return this.unread;
    }

    readMessage(message){
        this.data.forEach((m, index) => {
            //check to see if message exist
            if(m.id === message.id){
                console.log("i saw a message");
                this.data[index].seen = true;
                this.unread.count--;
                this.markMessageAsSeen(message.id);
            }
        });
    }

    protected markMessageAsSeen(message_id){
        var url = "messages/"+message_id+"/seen";
        this.api.get(url).subscribe();
    }

}
