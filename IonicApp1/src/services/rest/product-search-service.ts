import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
var amazon = require('amazon-product-api');

@Injectable()
export class ProductSearchService {
  data: Observable<any>;
  amazonClient: any;
  constructor(private http:HttpClient) {
    this.amazonClient = amazon.createClient({
      awsId: "jack",
      awsSecret: "AKIAINC6RC45SCTAQQYQ",
      awsTag: "aws Tag"
    })
  }

  searchAmazonItems(apiItemsName) {
    this.amazonClient.itemSearch({
      director: 'Quentin Tarantino',
      actor: 'Samuel L. Jackson',
      searchIndex: 'DVD',
      audienceRating: 'R',
      responseGroup: 'ItemAttributes,Offers,Images'
    }).then(function(results){
      console.log(results);
      return results.data;
    }).catch(function(err){
      console.log(err);
      return;
    });
  }

  searchWalmartItems(apiItemsName) {
    var url = 'http://api.walmartlabs.com/v1/search?apiKey=vwtzj6yrpv53yrp62squshbm&query='+encodeURI(apiItemsName);
    this.data = this.http.get(url).map(ite => (<any>ite));
    var response = this.data;
    return response;
  }
}
