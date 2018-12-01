import { Component } from '@angular/core';
import {ActionSheetController, AlertController, IonicPage, NavController, LoadingController, Loading} from 'ionic-angular';
import { APIInfoPage } from "../APIinfo/APIinfo";
import {Camera, CameraOptions} from "@ionic-native/camera";

import { GoogleCloudVisionServiceProvider} from "../../providers/google-cloud-vision-service/google-cloud-vision-service";
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import {WalmartLab} from "../../services/rest/walmartLab";
import {AmazonAws} from "../../services/rest/amazon";
import {errorHandler} from "@angular/platform-browser/src/browser";
import {EbayLab} from "../../services/rest/ebay";

// @ts-ignore
@IonicPage()
@Component({
  selector: 'page-list-master',
  templateUrl: 'list-master.html'
})
export class ListMasterPage {
  Dresult=[];
  apiItems: any;
  ebayItem: any;
  picItems: any;
  loading: Loading;
  PicItems: FirebaseListObservable<any>;
  constructor(
    private vision: GoogleCloudVisionServiceProvider,
    private afdb: AngularFireDatabase,
    private alert: AlertController,
    public navCtrl: NavController,
    private walmartLab: WalmartLab,
    private amazonAWS: AmazonAws,
    private ebayLab: EbayLab,
    public camera: Camera,
    private actionSheetCtrl: ActionSheetController,
    public loadingCtrl: LoadingController) {
    this.PicItems = afdb.list('items');
  }
  Pictake1() {
    // @ts-ignore
    this.actionSheetCtrl.create({
      buttons:[
        {
          text: 'From Camera',
          handler: async () => {
            try {
              const options: CameraOptions = {
                quality: 50,
                targetHeight: 600,
                targetWidth: 600,
                destinationType: this.camera.DestinationType.DATA_URL,
                encodingType: this.camera.EncodingType.PNG,
                mediaType: this.camera.MediaType.PICTURE,
              };
              this.camera.getPicture(options).then((imageData) => {
                this.showLoader();
                this.vision.getLabels(imageData).subscribe((result) => {
                  // @ts-ignore
                  this.Dresult =  result.responses[0].webDetection.webEntities;
                  this.picItems = this.Dresult;
                  this.saveResults(imageData, this.Dresult);
                  this.loading.dismissAll()

                }, err => {
                  this.showAlert(err);
                });
              }, err => {
                this.showAlert(err);
              });
            }
            catch (e) {
              console.error(e);
            }
          }
        },
        {
          text: 'From Gallery',
          handler: async () => {
            try {
              const options: CameraOptions = {
                quality: 100,
                targetHeight: 600,
                targetWidth: 600,
                sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
                destinationType: this.camera.DestinationType.DATA_URL,
                encodingType: this.camera.EncodingType.PNG,
              };
              this.camera.getPicture(options).then((imageData) => {
                this.showLoader();
                this.vision.getLabels(imageData).subscribe((result) => {
                  // @ts-ignore
                  this.Dresult =  result.responses[0].webDetection.webEntities;
                  this.picItems = this.Dresult;
                  this.saveResults(imageData, this.Dresult);
                  this.loading.dismissAll()
                  }, err => {
                  this.showAlert(err);
                });
              }, err => {
                this.showAlert(err);
              });

            }
            catch (e) {
              console.error(e);
            }
          }
        },
        {
          text: 'Cancel',
          role: 'Cancel',
          handler: () => {
            console.log("The user has selected the cancel button");
          }
        }
      ]
    }).present();
  }

  searchForapiItems(event, key) {
    if(event.target.value.length > 3) {
      this.walmartLab.searchapiItems(event.target.value).subscribe(
        data => {
          this.apiItems = data.items;
          // console.log(data);
        },
        err => {
          console.log(err);
        },
        () => console.log('Product Search Complete')
      );

    }
  }

  selectapiItem(event, apiItem) {
    this.showLoader();
    this.ebayLab.searchebayItems(apiItem.name).subscribe(data => {
        this.ebayItem = data;
        console.log(this.ebayItem);
      },
      err => {
        console.log(err);
      },
      () => console.log('Product Search Complete')
    );
    // apiItem: apiItem,
    setTimeout(()=>{
      this.loading.dismissAll();
      this.navCtrl.push(APIInfoPage, {
        ebayItem: this.ebayItem,apiItem: apiItem });
    },2000);
  }

  selectapiItem1(event, picItem) {
    this.showLoader();
    this.walmartLab.searchapiItems(picItem.description).subscribe(
      data => {
        this.apiItems = data.items[0];
        console.log(data);
      },
      err => {
        console.log(err);
      },
      () => console.log('Product Search Complete')
    );
    this.ebayLab.searchebayItems(picItem.description).subscribe(data => {
        this.ebayItem = data;
        console.log(this.ebayItem);
      },
      err => {
        console.log(err);
      },
      () => console.log('Product Search Complete')
    );
    setTimeout(()=>{
      this.loading.dismissAll();
      this.navCtrl.push(APIInfoPage, {
        ebayItem: this.ebayItem,apiItem: this.apiItems });
    },2000);
  }

  saveResults(imageData, results) {
    this.PicItems.push({ imageData: imageData, results: results})
      .then(_ => { })
      // .catch(err => { this.showAlert(err) });
  }
  showAlert(message) {
    let alert = this.alert.create({
      title: 'Error',
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

  deleteResult(i) {
    this.afdb.list("/items/").remove(this.PicItems[i]);
  }

  showLoader(){
    this.loading = this.loadingCtrl.create({
      content:'Loading...'
    });
    this.loading.present();
  }
}


