import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, ToastController,} from 'ionic-angular';
import {WatchingListPage} from "../watching-list/watching-list";
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFireDatabase, FirebaseListObservable} from "angularfire2/database";
import {ItemDetailPage} from "../item-detail/item-detail";

@IonicPage()
@Component({
  selector: 'page-messagenew',
  templateUrl: 'messagenew.html'
})
export class MessagenewPage {
  watchinglist = [];
  allList = [];
  itemsW = [];
  q : string;

  constructor(
    private afAuth: AngularFireAuth,
    private afDatabase: AngularFireDatabase,
    private toast: ToastController,
    private alertCtrl: AlertController,

    public navCtrl: NavController) {

    this.afAuth.authState.take(1).subscribe(data => {
      if (data && data.email && data.uid) {

        this.afDatabase.list(`product/public`).subscribe(_data =>{
          this.allList = _data;
          console.log(this.allList);
        });
        this.afDatabase.list(`product/${data.uid}/watchingList/`).subscribe(_data =>{
          this.watchinglist = _data;
        });

      }
      else {
        this.toast.create({
          message: 'Please Login',
          duration: 2000,
          position: 'top'
        }).present();
      }
    });

  }

  addWatchingList() {

    this.afAuth.authState.take(1).subscribe(data1 => {
      if (data1 && data1.email && data1.uid) {

        let alert = this.alertCtrl.create({
          title: 'Add Product Name',
          inputs: [
            {
              name: 'product',
              placeholder: 'product name'
            }
          ],
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
              handler: data => {
                console.log('Cancel clicked');
              }
            },
            {
              text: 'Confirm',
              handler: data => {
                this.afDatabase.list(`product/${data1.uid}/watchingList`).push(data.product);
                this.toast.create({
                  message: 'Adding Successful',
                  duration: 2000,
                  position: 'top'
                }).present();
              }
            }
          ]
        });
        alert.present();
      }
      else {
        setTimeout(()=>{
          this.toast.create({
            message: 'Please Login...',
            duration: 2000,
            position: 'top'
          }).present();
        },500);
      }
    });

  }


  initializeItems1() {
    this.itemsW = this.allList;
  }


  getItemsValue(list){

    this.initializeItems1();

    const q = list;
    if (!q) {
      return;
    }
    this.itemsW = this.itemsW.filter((item) => {
      if(item.name && q) {
        if (item.name.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });
    console.log(q);


  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }


  deleteItemH(i) {

    this.afAuth.authState.take(1).subscribe(data => {
      this.afDatabase.list(`product/${data.uid}/watchingList/`).remove(this.watchinglist[i].$key);
    });

  }


  itemDetailH(item){

    this.navCtrl.push(ItemDetailPage, {apiItem: item });

  }

}
