import { Component } from '@angular/core';
import {IonicPage, NavController,} from 'ionic-angular';

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
  constructor(public navCtrl: NavController) { }

  signinp() {
    this.navCtrl.push('LoginPage');
  }
}
