import { Component } from '@angular/core';
import {IonicPage, Loading, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {ShareItems} from "../../models/shareitems";
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFireDatabase, FirebaseListObservable} from "angularfire2/database";
import  { InAppBrowser, InAppBrowserOptions} from "@ionic-native/in-app-browser";

@IonicPage()
@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html'
})
export class ItemDetailPage {
  item: {};
  loading: Loading;
  shareItems = {} as ShareItems;
  profileData: FirebaseListObservable<any>;
  url: string;
  constructor(
    public navCtrl: NavController,
    private afAuth: AngularFireAuth,
    private  afDatabase: AngularFireDatabase,
    private toast: ToastController,
    private iab: InAppBrowser,
    public loadingCtrl: LoadingController,
    navParams: NavParams) {


    this.item = navParams.get('apiItem');

    console.log(this.item)
  }


  starItemH(data) {

    this.showLoader();
    this.shareItems.name = data.name;
    this.shareItems.price = data.price;
    this.shareItems.imageURL = data.imageURL;
    this.shareItems.description = data.description;
    this.shareItems.web = data.web;
    this.shareItems.rating = data.rating;
    this.shareItems.shareTimes = 1;
    this.shareItems.store = "Walmart";
    this.shareItems.userID = "Default";

    this.afAuth.authState.take(1).subscribe(data => {
      if (data && data.email && data.uid) {
        // @ts-ignore
        this.profileData = this.afDatabase.object(`profile/${data.uid}/Profile`);
        if (this.profileData) {
          this.afDatabase.list(`product/${data.uid}/myStars`).push(this.shareItems);
          setTimeout(()=>{
            this.loading.dismissAll();
            this.toast.create({
              message: 'Star complete',
              duration: 2000,
              position: 'top'
            }).present();
          },500);
        }
        else {
          setTimeout(()=>{
            this.loading.dismissAll();
            this.toast.create({
              message: 'Please Login...',
              duration: 2000,
              position: 'top'
            }).present();
          },500);
        }
      }
      else {
        setTimeout(()=>{
          this.loading.dismissAll();
          this.toast.create({
            message: 'Please Login...',
            duration: 2000,
            position: 'top'
          }).present();
        },500);
      }
    });
  }
  showLoader(){
    this.loading = this.loadingCtrl.create({
      content:'Staring...'
    });
    this.loading.present();
  }

  openPage(item) {

    if(item.web == "none" ) {
      this.toast.create({
        message: 'Sorry, the referrer did not upload the link',
        duration: 2000,
        position: 'top'
      }).present();
    }
    else {
      const options: InAppBrowserOptions = {
        zoom: 'no'
      };
      const browser = this.iab.create(item.web, '_self', options);
    }
  }
}
