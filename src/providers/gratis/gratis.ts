import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Api } from '../api/api';
import { Model } from '../model/model';
import { User } from '../user/user';

@Injectable()
export class Gratis extends Model {

    model = "liveads";
    winAds:any = [];

    viewedAds: Array<number> = [];

    constructor(public api: Api, public _user: User) {
        super(api, _user)
        console.log('Hello GratisProvider Provider');
    }

    protected _fetchData(){
        return new Promise((resolve, reject) => {
            this.api.get(this.model)
                .subscribe((data: any) => {
                    this.data = data.batchAds;
                    this.winAds = data.ads;
                    resolve(this.data);
                })
        })
    }

    loadLatest(ad_id: number){
        return new Promise((resolve, reject) => {
            this.api.get("ad/" + ad_id)
            .subscribe((latest:any) => {
                resolve(latest);

                if(!this.data) return;

                this.data.forEach((oldAd, index) => {
                    if(oldAd.ad.id === latest.id){
                        console.log("found match for latest");
                        this.data[index].ad = latest;
                    }
                });
            });
        })
    }

    view(ad_id: number, user_id: number){
        return new Promise((resolve, reject)=>{
            if(this.viewedAds.indexOf(ad_id) === -1){
                this.api.get("track/view/ad/" + ad_id + "/" + user_id)
                    .subscribe(() => {
                        resolve("yes");
                        this.viewedAds.push(ad_id);
                        this.refreshPoints();
                    });
            }else{
                resolve("no");
            }
        })
    }

    submitShare(ad_id: number, user_id: number) {
        return new Promise((resolve, reject)=>{
            this.api.post("submitadshare/" + ad_id, { user_id: user_id })
                .subscribe(data => {
                    resolve(data);

                    this.data.forEach(livead => {
                        if(livead.ad.id === ad_id){
                            livead.ad.shares.push({user_id: user_id});
                        }
                    });
                    this.refreshPoints();
                });
        })
    }


    submitLike(ad_id: number, user_id: number) {
        return new Promise((resolve, reject) => {
            this.api.post("submitadlike/" + ad_id, { user_id: user_id })
                .subscribe(data => {
                    resolve(data);

                    this.data.forEach(livepromo => {
                        if(livepromo.ad.id === ad_id){
                            livepromo.ad.likes.push({user_id: user_id});
                        }
                    });
                    this.refreshPoints();
                });

        })
    }

    isLikable(ad_id: number, user_id: number) {
        return new Promise((resolve, reject) => {
            this.api.post("checkadlike/" + ad_id, { user_id: user_id })
                .subscribe((data: any) => {
                    resolve(data.liked);
                });
        });
    }

    submitComment(comment: string, ad_id: number, user_id: number){

        return new Promise((resolve, reject) => {
            this.api.post("submitadcomment/" + ad_id, { comment: comment, user_id: user_id })
            .subscribe((data: any) => {
                resolve(data);

                this.data.forEach(livepromo => {
                    if(livepromo.ad.id === ad_id){
                        livepromo.ad.comments.splice(0, 0, data.comment);
                    }
                });
                this.refreshPoints();
            });
        })
    }

    getStats(ad_id){
        return new Promise((resolve, reject) => {
            console.log("getting ad stats");
            this.api.get("track/get_stats/ad/" + ad_id)
            .subscribe((stats: any) => {
                resolve(stats);
            });
        })
    }

    submitAnswer(livead_id, answer, user_id){
        return new Promise((resolve, reject) => {
            this.api.post("answerquestion/" + livead_id, { answer, user_id })
                .subscribe(data => {
                    resolve(data);
                    // this.showToast(data.message);
                    // this.answered = true;
                });
        })
    }

    isQuestionAnswered(livead_id, user_id){
        return new Promise((resolve, reject) => {
            this.api.post("isanswered/" + livead_id, { user_id })
                .subscribe((data: any) => {
                    resolve(data.data);
                });
        })
    }

}
