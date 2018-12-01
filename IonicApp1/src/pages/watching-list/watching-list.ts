import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AngularFireDatabase} from "angularfire2/database";
import {ItemCreatePage} from "../item-create/item-create";
import {AngularFireAuth} from "angularfire2/auth";

@IonicPage()
@Component({
  selector: 'page-watching-list',
  templateUrl: 'watching-list.html',
})
export class WatchingListPage {
  arrData = [];
  arrData1 = [];
  items = [];
  myInput;
  constructor(
    public navCtrl: NavController,
    private afAuth: AngularFireAuth,
    private fdb: AngularFireDatabase
  ) {


    this.fdb.list("/myItems/").subscribe(_data =>{
      this.arrData = _data;
      console.log(this.arrData);
    });

    this.afAuth.authState.take(1).subscribe(auth =>{
      this.fdb.list(`product/${auth.uid}`).subscribe(_data =>{
        this.arrData1 = _data;
        this.items = this.arrData1;
        console.log(this.arrData1);
      });
    });

  }
  btnAddClicked() {
    this.fdb.list("/myItems/").push(this.myInput);
  }
  // deleteItem(i) {
  //   this.fdb.list("/myItems/").remove(this.arrData[i].$key);
  // }

  initializeItems() {
    this.items = this.arrData1;
  }

  getItems(searchbar) {
    // Reset items back to all of the items
    this.initializeItems();

    var q = searchbar.srcElement.value;
    if (!q) {
      return;
    }
    // if the value is an empty string don't filter the items
    this.items = this.items.filter((item) => {

      if(item.name && q) {
        if (item.name.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    })
  }



}
