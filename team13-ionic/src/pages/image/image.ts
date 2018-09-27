import { Component } from '@angular/core';
import { Camera } from 'ionic-native';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ImagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-image',
  templateUrl: 'image.html',
})
export class ImagePage {
  public base64Image: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ImagePage');
  }

  takePicture() {
    Camera.getPicture({
      destinationType: Camera.DestinationType.DATA_URL,
      targetWidth: 1000,
      targetHeight: 1000
    }).then((imageData) => {
      this.base64Image = "data:image/jpeg;base64," + imageData;
    }, (err) => {
      console.log(err);
    });
  }

}
