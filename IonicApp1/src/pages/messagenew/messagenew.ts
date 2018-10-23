import { Component } from '@angular/core';
import {IonicPage, NavController,} from 'ionic-angular';
import {WatchingListPage} from "../watching-list/watching-list";

@IonicPage()
@Component({
  selector: 'page-messagenew',
  templateUrl: 'messagenew.html'
})
export class MessagenewPage {

  constructor(
    public navCtrl: NavController) {
  }

  addWatchingList() {
    this.navCtrl.setRoot('WatchingListPage')
  }

}
