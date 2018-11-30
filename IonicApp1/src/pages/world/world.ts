import { Component } from '@angular/core';
import {IonicPage, NavController,} from 'ionic-angular';

import {AngularFireDatabase} from "angularfire2/database";
import {ItemCreatePage} from "../item-create/item-create";

@IonicPage()
@Component({
  selector: 'page-world',
  templateUrl: 'world.html'
})
export class WorldPage {
  constructor(public navCtrl: NavController, private fdb: AngularFireDatabase) {
  }
  uploaditems() {
    // this.navCtrl.push(ItemCreatePage);
  }
}
