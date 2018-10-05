import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import {GooglePlus} from "@ionic-native/google-plus";
import { User } from '../../providers';
import { MainPage } from '../';
import {LoadingController, Loading} from "ionic-angular";
import {NativeStorage} from "@ionic-native/native-storage";
import {SettingsPage} from "../settings/settings";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: { email: string, password: string, username: string} = {
    email: 'max@umkc.edu',
    username: 'max',
    password: 'max'
  };

  // Our translated text strings
  private loginErrorString: string;
  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    public googlePlus: GooglePlus, public loadingCtrl: LoadingController, public nativeStorage: NativeStorage
  )
{

    this.translateService.get('LOGIN_ERROR').subscribe((value) => {
      this.loginErrorString = value;
    })
  }
  signup1() {
    this.navCtrl.push('SignupPage');
  }
  // Attempt to login in through our User service
  doLogin() {
    this.user.login(this.account).subscribe((resp) => {
      this.navCtrl.push(MainPage);
    }, (err) => {
      this.navCtrl.push(MainPage);
      // Unable to log in
      let toast = this.toastCtrl.create({
        message: this.loginErrorString,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
  }

  doGoogleLogin(){
    let nav = this.navCtrl;
    let env = this;
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.googlePlus.login({
      'scopes': '', // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
      'webClientId': '489123086268-j2sn6qdl0ofpdirikl38lgq13o48742a.apps.googleusercontent.com', // optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
      'offline': true
    })
      .then(function (users) {
        loading.dismiss();

        env.nativeStorage.setItem('user', {
          Google_name: users.displayName,
          Google_email: users.email,
          Google_picture: users.imageUrl
        })
          .then(function(){
            nav.push(SettingsPage);
          }, function (error) {
            console.log(error);
          })
      }, function (error) {
        loading.dismiss();
      });

  }
}

