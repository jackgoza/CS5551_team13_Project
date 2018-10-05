import { Component } from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import { MovieService } from "../../services/rest/movie-service";
import { APIInfoPage } from "../APIinfo/APIinfo";
import {ItemCreatePage} from "../item-create/item-create";

// @ts-ignore
@IonicPage()
@Component({
  selector: 'page-list-master',
  templateUrl: 'list-master.html'
})
export class ListMasterPage {
  apiItems: Array<any>;

  constructor(public navCtrl: NavController, private movieService: MovieService) {
  }
  Pictake1() {
    this.navCtrl.push(ItemCreatePage)
  }
  searchForapiItems(event, key) {
    if(event.target.value.length > 2) {
      this.movieService.searchapiItems(event.target.value).subscribe(
        data => {
          this.apiItems = data.items;
          // this.movies = data.items;
          console.log(data);
        },
        err => {
          console.log(err);
        },
        () => console.log('Product Search Complete')
      );
    }
  }
  selectapiItem(event, apiItem) {
    console.log(apiItem);
    this.navCtrl.push(APIInfoPage, {
      apiItem: apiItem
    });
  }

}
