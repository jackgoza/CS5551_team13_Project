import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Camera, CameraOptions} from '@ionic-native/camera';
import {ActionSheetController, IonicPage, NavController, ViewController} from 'ionic-angular';
import firebase from 'firebase';
import { userInfo } from 'os';
@IonicPage()
@Component({
  selector: 'page-item-create',
  templateUrl: 'item-create.html'
})
export class ItemCreatePage {
  @ViewChild('fileInput') fileInput;
  isReadyToSave: boolean;
  item: any;
  form: FormGroup;

  picdata:any;
  picurl:any;
  mypicref:any;

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, formBuilder: FormBuilder, public camera: Camera,
              private actionSheetCtrl: ActionSheetController) {

    this.mypicref=firebase.storage().ref('/photos/');

    this.form = formBuilder.group({
      profilePic: [''],
      name: ['', Validators.required],
      about: ['']
    });
    // Watch the form for changes, and
    this.form.valueChanges.subscribe((v) => {
      this.isReadyToSave = this.form.valid;
    });
  }

  selectPicture() {
    this.actionSheetCtrl.create({
      buttons:[
        {
          text: 'From Camera',
          handler: async () => {
            try {
              this.camera.getPicture({
                quality: 100,
                destinationType: this.camera.DestinationType.DATA_URL,
                sourceType: this.camera.PictureSourceType.CAMERA,
                encodingType: this.camera.EncodingType.PNG,
                saveToPhotoAlbum: true
              }).then(imageData => {
                this.picdata = imageData;
                this.uploadPhoto();
              }, error => {
                console.log("ERROR -> " + JSON.stringify(error));
              });
            }
            catch (e) {
              console.error(e);
            }
          }
        },
        {
          text: 'From Gallery',
          handler: () => {
            try {
              this.camera.getPicture({
                sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
                destinationType: this.camera.DestinationType.DATA_URL,
                quality: 100,
                encodingType: this.camera.EncodingType.PNG,
              }).then(imageData => {
                this.picdata = imageData;
                this.uploadPhoto();
              }, error => {
                console.log("ERROR -> " + JSON.stringify(error));
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
  processWebImage(event) {
    let reader = new FileReader();
    reader.onload = (readerEvent) => {
      let imageData = (readerEvent.target as any).result;
      this.form.patchValue({ 'profilePic': imageData });
    };
    reader.readAsDataURL(event.target.files[0]);
  }
  getProfileImageStyle() {
    return 'url(' + this.form.controls['profilePic'].value + ')'
  }
  /**
   * The user cancelled, so we dismiss without sending data back.
   */
  cancel() {
    this.viewCtrl.dismiss();
  }
  /**
   * The user is done and wants to create the item, so return it
   * back to the presenter.
   */
  done() {
    if (!this.form.valid) { return; }
    this.viewCtrl.dismiss(this.form.value);
  }

  private uploadPhoto(): void {
    this.mypicref.child("jack").child(this.generateUUID()+'.png')
      .putString(this.picdata, 'base64', { contentType: 'image/png' })
      .then((savedPicture) => {
        this.picurl = savedPicture.downloadURL;
      });
  }

  private generateUUID(): any {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx'.replace(/[xy]/g, function (c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
  }
}
