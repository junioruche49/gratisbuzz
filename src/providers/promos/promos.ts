import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Model } from '../model/model';
import { Api } from '../api/api';
import { User } from './../user/user';

@Injectable()
export class Promos extends Model {

    model = "livepromos";

    viewedPromos: Array<number> = [];

    constructor(public api: Api, public _user: User) {
        super(api, _user);
        console.log('Hello PromosProvider Provider');
    }

    loadLatest(promo_id: number){
        return new Promise((resolve, reject) => {
            this.api.get("promo/" + promo_id)
            .subscribe((latest:any) => {
                if(!this.data) this.data = [];
                this.data.forEach((oldPromo, index) => {
                    if(oldPromo.promo.id === latest.id){
                        console.log("found match for latest");
                        this.data[index].promo = latest;
                    }
                });
                resolve(latest);
            });
        })
    }

    view(promo_id: number, user_id: number){
        return new Promise((resolve, reject)=>{
            if(this.viewedPromos.indexOf(promo_id) === -1){
                this.api.get("track/view/promo/" + promo_id + "/" + user_id)
                    .subscribe(() => {
                        resolve("yes");
                        this.viewedPromos.push(promo_id);
                        this.refreshPoints();
                    });
            }else{
                resolve("no");
            }
        })
    }

    submitShare(promo_id: number, user_id: number) {
        return new Promise((resolve, reject)=>{
            this.api.post("submitpromoshare/" + promo_id, { user_id: user_id })
                .subscribe(data => {
                    resolve(data);

                    this.data.forEach(livepromo => {
                        if(livepromo.promo.id === promo_id){
                            livepromo.promo.stats.shares++;
                            // livepromo.promo.shares.push({user_id: user_id});
                        }
                    });
                    this.refreshPoints();
                });
        })
    }


    submitLike(promo_id: number, user_id: number) {
        return new Promise((resolve, reject) => {
            this.api.post("submitpromolike/" + promo_id, { user_id: user_id })
                .subscribe(data => {
                    resolve(data);

                    this.data.forEach(livepromo => {
                        if(livepromo.promo.id === promo_id){
                            livepromo.promo.stats.likes++;
                            // livepromo.promo.likes.push({user_id: user_id});
                        }
                    });
                    this.refreshPoints();
                });

        })
    }

    isLikable(promo_id: number, user_id: number) {
        return new Promise((resolve, reject) => {
            this.api.post("checkpromolike/" + promo_id, { user_id: user_id })
                .subscribe((data: any) => {
                    resolve(data.liked);
                });
        });
    }

    submitComment(comment: string, promo_id: number, user_id: number){

        return new Promise((resolve, reject) => {
            this.api.post("submitpromocomment/" + promo_id, { comment: comment, user_id: user_id })
            .subscribe((data: any) => {
                resolve(data);

                this.data.forEach(livepromo => {
                    if(livepromo.promo.id === promo_id){
                        livepromo.promo.comments.splice(0, 0, data.comment);
                    }
                });
                this.refreshPoints();
            });
        })
    }

    getStats(promo_id){
        return new Promise((resolve, reject) => {
            this.api.get("track/get_stats/promo/" + promo_id)
            .subscribe((stats: any) => {
                resolve(stats);
            });
        })
    }

}
