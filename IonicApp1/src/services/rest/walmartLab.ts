import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs";
// import {HTTP} from "@ionic-native/http";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class WalmartLab {
  data: Observable<any>;
  constructor(private http: HttpClient) {
  }
  searchapiItems(apiItemsName) {
    // var url = 'http://api.walmartlabs.com/v1/search?apiKey=vwtzj6yrpv53yrp62squshbm&lsPublisherId={Your%20LinkShare%20Publisher%20Id}&query='+encodeURI(apiItemsName);
    // // @ts-ignore
    // this.data = this.http.get(url).map(ite => (<any>ite));
    // var response = this.data;
    // return response;

    var url = 'https://ase5551-walmart.herokuapp.com/server';
    // @ts-ignore
    this.data = this.http.get(url,{params: {name: apiItemsName}}).map(ite => (<any>ite));
    var response1 = this.data;
    return response1;

  }
}
