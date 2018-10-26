import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class eBay {
  secret: 'JohnGoza-cs5551pr-SBX-a7f402c32-531e228e';
  data: Observable<any>;
  constructor(private http:HttpClient) {
  }
  searchapiItems(apiItemsName) {
    var url = 'http://svcs.sandbox.ebay.com/services/search/FindingService/v1?GLOBAL-ID=EBAY-US&OPERATION-NAME=findItemsByKeywords&SERVICE-VERSION=1.0.0&SECURITY-APPNAME=' + this.secret + '&keywords=' +encodeURI(apiItemsName) + '&paginationInput.entriesPerPage=10';
    this.data = this.http.get(url).map(ite => (<any>ite));
    var response = this.data;
    return response;
  }
}
