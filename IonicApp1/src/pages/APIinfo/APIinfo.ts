import { Component } from '@angular/core';
import {
  AlertController,
  IonicPage,
  Loading,
  LoadingController,
  NavController,
  NavParams,
  ToastController
} from 'ionic-angular';
import {ShareItems} from "../../models/shareitems";
import {AngularFireDatabase, FirebaseListObservable} from "angularfire2/database";
import {AngularFireAuth} from "angularfire2/auth";

@IonicPage()
@Component({
  selector: 'page-APIinfo',
  templateUrl: 'APIinfo.html',
})
export class APIInfoPage {
  shareItems = {} as ShareItems;
  profileData: FirebaseListObservable<any>;
  apiItem: {};
  ebayItem: {};
  loading: Loading;
  constructor(
    public navCtrl: NavController,
    private  afDatabase: AngularFireDatabase,
    private afAuth: AngularFireAuth,
    private toast: ToastController,
    private alertCtrl: AlertController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController) {

    this.apiItem = navParams.get('apiItem');
    this.ebayItem = navParams.get('ebayItem');
    console.log(this.ebayItem);
    console.log(this.apiItem)

  }

  starItemWal(data) {

    this.showLoader();
    this.shareItems.name = data.name;
    this.shareItems.price = data.salePrice;
    this.shareItems.imageURL = data.largeImage;
    this.shareItems.description = data.shortDescription;
    this.shareItems.rating = data.customerRating;
    this.shareItems.web = data.productUrl;
    this.shareItems.shareTimes = 1;
    this.shareItems.store = "Walmart";
    this.shareItems.userID = "Default";

    this.afAuth.authState.take(1).subscribe(data => {
      if (data && data.email && data.uid) {
        // @ts-ignore
        this.profileData = this.afDatabase.object(`profile/${data.uid}/Profile`);
        if (this.profileData) {
          this.afDatabase.list(`product/${data.uid}/myStars`).push(this.shareItems)
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

  shareItemWal(data) {

    this.showLoader();
    this.shareItems.name = data.name;
    this.shareItems.price = data.salePrice;
    this.shareItems.imageURL = data.largeImage;
    this.shareItems.description = data.shortDescription;
    this.shareItems.rating = data.customerRating;
    this.shareItems.web = data.productUrl;
    this.shareItems.shareTimes = 1;
    this.shareItems.store = "Walmart";
    this.shareItems.userID = "Default";

    this.afAuth.authState.take(1).subscribe(data => {
      if (data && data.email && data.uid) {
        // @ts-ignore
        this.profileData = this.afDatabase.object(`profile/${data.uid}/Profile`);
        if (this.profileData) {
          this.afDatabase.list(`product/public`).push(this.shareItems)
          setTimeout(()=>{
            this.loading.dismissAll();
            // this.toast.create({
            //   message: 'Sharing complete',
            //   duration: 2000,
            //   position: 'top'
            // }).present();
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

  presentPrompt(product) {

    this.shareItems.name = product.name;
    this.shareItems.imageURL = product.largeImage;
    this.shareItems.description = product.shortDescription;
    this.shareItems.rating = product.customerRating;
    this.shareItems.web = product.productUrl;
    this.shareItems.shareTimes = 1;

    this.afAuth.authState.take(1).subscribe(data1 => {
      if (data1 && data1.email && data1.uid) {
        // @ts-ignore
        this.profileData = this.afDatabase.object(`profile/${data1.uid}/Profile`);
        if (this.profileData) {
          let alert = this.alertCtrl.create({
            title: 'Your deal',
            inputs: [
              {
                name: 'username',
                placeholder: 'Username'
              },
              {
                name: 'price',
                placeholder: 'price',
                type: 'number',
              },
              {
                name: 'store',
                placeholder: 'store',
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

                  this.shareItems.userID = data.username;
                  this.shareItems.price = data.price;
                  this.shareItems.store = data.store;
                  this.afDatabase.list(`product/public`).push(this.shareItems);
                  this.afDatabase.list(`product/${data1.uid}/myDeals`).push(this.shareItems);

                  this.toast.create({
                    message: 'Upload complete',
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

}
