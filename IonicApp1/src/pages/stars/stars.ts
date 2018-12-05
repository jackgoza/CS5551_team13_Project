import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFireDatabase} from "angularfire2/database";



@IonicPage()
@Component({
  selector: 'page-stars',
  templateUrl: 'stars.html',
})
export class StarsPage {
  arrDataS= [];
  itemsHome= [];
  constructor(
    public navCtrl: NavController,
    private afAuth: AngularFireAuth,
    private fdb: AngularFireDatabase) {

    this.afAuth.authState.take(1).subscribe(auth =>{
      this.fdb.list(`product/${auth.uid}/myStars`).subscribe(_data =>{
        this.arrDataS = _data;
        this.itemsHome = this.arrDataS;
        console.log(this.arrDataS);
      });
    });

  }

  initializeItems() {
    this.itemsHome = this.arrDataS;
  }

  getItems(searchbar) {
    // Reset items back to all of the items
    this.initializeItems();

    var q = searchbar.srcElement.value;
    if (!q) {
      return;
    }
    // if the value is an empty string don't filter the items
    this.itemsHome = this.itemsHome.filter((item) => {
      if(item.name && q) {
        if (item.name.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    })
  }

  deleteitemS(i) {
    this.afAuth.authState.take(1).subscribe(auth =>{
      this.fdb.list(`product/${auth.uid}/myStars`).remove(this.arrDataS[i]);
    });
  }



}
