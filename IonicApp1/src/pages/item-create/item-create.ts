import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Camera, CameraOptions} from '@ionic-native/camera';
import {ActionSheetController, IonicPage, NavController, ViewController} from 'ionic-angular';
import firebase from 'firebase';
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

    this.mypicref=firebase.storage().ref('/');

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
              const options: CameraOptions = {
                quality: 50,
                targetHeight: 600,
                targetWidth: 600,
                destinationType: this.camera.DestinationType.DATA_URL,
                encodingType: this.camera.EncodingType.JPEG,
                mediaType: this.camera.MediaType.PICTURE,
              };
              const result = await this.camera.getPicture(options)
              const image = 'data:image/jpeg;base64,${result}';
              const pictures = firebase.storage().ref('pictures');
              pictures.putString(image, 'data_url');
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
              this.picdata = this.fileInput.nativeElement.click();
              const image = 'data:image/jpeg;base64,' + this.picdata;
              const pictures = firebase.storage().ref('pictures/maxPics2/');
              pictures.putString(image, 'base64', {contentType: 'image/jpg'});  //this is the failing line
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
}
