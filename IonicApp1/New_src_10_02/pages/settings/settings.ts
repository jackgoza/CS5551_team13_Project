import { Component } from '@angular/core';
import {IonicPage, NavController,} from 'ionic-angular';
import {NativeStorage} from "@ionic-native/native-storage";
import {GooglePlus} from "@ionic-native/google-plus";
import {LoginPage} from "../login/login";

/**
 * The Settings page is a simple form that syncs with a Settings provider
 * to enable the user to customize settings for the app.
 *
 */
@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {
  constructor(public navCtrl: NavController, public nativeStorage: NativeStorage, public googlePlus: GooglePlus) {

  }

  signinp() {
    this.navCtrl.push('LoginPage');
  }
  doGoogleLogout(){
    let nav = this.navCtrl;
    let env = this;
    this.googlePlus.logout()
      .then(function (response) {
        env.nativeStorage.remove('user');
        nav.push(LoginPage);
      },function (error) {
        console.log(error);
      })
  }




}
