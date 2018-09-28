import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  constructor(private alertController: AlertController, public navCtrl: NavController, public navParams: NavParams) {
  }

  registerCredentials = { firstName: '', lastName: '', email: '', password: '', confirmation_password: '' };

  presentAlert(title, text, button) {
    let alert = this.alertController.create({
      title: title,
      subTitle: text,
      buttons: [button]
    });
    alert.present();
  }

  register() {
    if (this.registerCredentials.password != this.registerCredentials.confirmation_password) {
      this.presentAlert("Password Error!", "The passwords do not match'", "Try again!");
    } else {
      this.presentAlert("Registration successful!", "You are registered!", "Okay");
      this.navCtrl.popToRoot();
    }
  }

}
