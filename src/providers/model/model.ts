import { Injectable } from '@angular/core';
import { Api } from './../api/api';
import 'rxjs/add/operator/map';
import { User } from '../user/user';

@Injectable()
export class Model {

    model = 'vendors';
    data:any = null;
    protected _last_fetch = null;

    constructor(
        public api: Api,
        public _user: User,
    ) {
        console.log('Hello ModelsProvider Provider');
    }

    protected _checkIfDataExist(){
        //Check last fetch
        if(this.data){
            return true;
        }else{
            return false
        }
    }

    protected _fetchData(){
        return new Promise((resolve, reject) => {
            this.api.get(this.model)
                .subscribe(data => {
                    this.data = data;
                    resolve(this.data);
                })
        })
    }

    getData(forced=false) {
        return new Promise((resolve, reject) => {

            let fromMemory = !forced && this._checkIfDataExist();

            if(fromMemory){
                console.log(`Getting ${this.model} from memory`);
                resolve(this.data);
            }else{
                this._fetchData().then(data => {
                    console.log(`Fetching new ${this.model}`);
                    resolve(this.data);
                })
            }

        });
    }

    refreshPoints(){
        this._user.getPoints();
    }

}
