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
      awsId: "jack",  //Id is not valid
      awsSecret: "AKIAINC6RC45SCTAQQYQ",
      awsTag: "aws Tag"
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
