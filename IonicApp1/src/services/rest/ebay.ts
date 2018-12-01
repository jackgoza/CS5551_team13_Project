import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs";
// import {HTTP} from "@ionic-native/http";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class EbayLab {
  data: Observable<any>;
  constructor(private http: HttpClient) {
  }
  searchebayItems(apiItemsName) {
    // var url = "http://svcs.ebay.com/services/search/FindingService/v1";
    // url += "?OPERATION-NAME=findItemsByKeywords";
    // url += "&SERVICE-VERSION=1.0.0";
    // url += "&SECURITY-APPNAME=HongkunJ-CS5551ma-PRD-85f81118f-1d590057";
    // url += "&GLOBAL-ID=EBAY-US";
    // url += "&RESPONSE-DATA-FORMAT=XML";
    // url += "&callback=_cb_findItemsByKeywords";
    // url += "&REST-PAYLOAD";
    // url += "&keywords="+ apiItemsName;
    // url += "&paginationInput.entriesPerPage=3";

    var url = "https://cs5551-project-ebay.herokuapp.com/server";
    this.data = this.http.get(url,{params: {name: apiItemsName}}).map(ite => (<any>ite));
    var response = this.data;
    return response;
    // var url = 'http://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsByKeywords&SECURITY-' +
    //   'APPNAME=HongkunJ-CS5551ma-PRD-85f81118f-1d590057&GLOBAL-ID=EBAY-US&RESPONSE-DATA-FORMAT=JSON&callback=_cb_f' +
    //   'indItemsByKeywords&REST-PAYLOAD&keywords='+apiItemsName+'&paginationInput.entriesPerPage=3';
    // this.data = this.http.get(url).map(ite => (<any>ite));
    // this.data = this.http.get(url);
    // this.data.success(function (data) {
    //
    //   var data1 = JSON.stringify(data);
    //   console.log("======="+data1);
    //   var data2 = data1.replace('/**/_cb_findItemsByKeywords({','{');
    //   console.log("==="+data2);
    //   var data3 = data2.replace(']}]})',']}]}');
    //   console.log("="+data3);
    //   var data4 = JSON.parse(data3);
    //   console.log(data4)
    //
    //
    //   var response = data4;
    //   return response;


    // })
    // @ts-ignore
    // this.data1 = JSON.stringify(data);
    // console.log("======="+this.data1);
    // this.data2 = this.data1.replace('/**/_cb_findItemsByKeywords({','{');
    // console.log("==="+this.data2);
    // this.data3 = this.data2.replace(']}]})',']}]}');
    // console.log("="+this.data3);
    // this.data4 = JSON.parse(this.data3);
    // console.log(this.data4)

  }
}
