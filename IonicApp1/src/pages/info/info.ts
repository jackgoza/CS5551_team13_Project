import { Component } from '@angular/core';
import {IonicPage, NavController,} from 'ionic-angular';

import {AngularFireDatabase} from "angularfire2/database";
import {ItemCreatePage} from "../item-create/item-create";

@IonicPage()
@Component({
  selector: 'page-info',
  templateUrl: 'info.html'
})
export class InfoPage {
  constructor(public navCtrl: NavController, private fdb: AngularFireDatabase) {
  }
  uploaditems() {
    this.navCtrl.push(ItemCreatePage);
  }
}
