import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

declare var require: any;
var amazon = require('amazon-product-api');

@Injectable()
export class AmazonAws {
  data: Observable<any>;
  amazonClient: any;
  constructor(
              private http:HttpClient) {

    this.amazonClient = amazon.createClient({
      awsId: "jack",  //We have determined that we need an amazon associate account
      awsSecret: "AKIAINC6RC45SCTAQQYQ", // and a corresponding key
      awsTag: "aws Tag"  // unfortunately that takes money
    })
  }
  searchAmazonItems(itemAmazon) {
    this.amazonClient.itemSearch({
      // director: 'Quentin Tarantino',
      // actor: 'Samuel L. Jackson',
      // searchIndex: 'DVD',
      // audienceRating: 'R',
      // responseGroup: 'ItemAttributes,Offers,Images'
      Keywords: itemAmazon
    }).then(function(results){
      console.log(results);
      return results;
    }).catch(function(err){
      console.log(err);
      return;
    });
  }
}
