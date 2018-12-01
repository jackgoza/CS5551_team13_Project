import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import {GooglePlus} from "@ionic-native/google-plus";
import {LoadingController} from "ionic-angular";
import {NativeStorage} from "@ionic-native/native-storage";
import {SettingsPage} from "../settings/settings";
import {User} from "../../models/user";
import {AngularFireAuth} from "angularfire2/auth";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  user = {} as User;

  private loginErrorString: string;
  constructor(public navCtrl: NavController,
    private afAuth: AngularFireAuth,
    public googlePlus: GooglePlus, public loadingCtrl: LoadingController, public nativeStorage: NativeStorage
  )
{
  this.loginErrorString = "Unable to sign in. Please check your account information and try again.";
  }
  async doLogin(user: User) {
    try {
      const result = this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
      if (result) {
        this.navCtrl.setRoot('TabsPage');
      }
    }
    catch (e) {
      console.error(e);
    }
  }
  signup1() {
    this.navCtrl.push('SignupPage');
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
      'webClientId': 'YOUR WEB_CLI_ID', // optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
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

