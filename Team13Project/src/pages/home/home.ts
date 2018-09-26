import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GooglePlus } from 'ionic-native';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
 
  constructor(public navCtrl: NavController) {

  }

  login(){

      GooglePlus.login({
        'webClientId': '595849411292-7lnukpf1ogfcegaebg0t2p1dcugtedup.apps.googleusercontent.com'
      }).then((res) => {
          console.log(res);
      }, (err) => {
          console.log(err);
      });

  }

  logout(){

      GooglePlus.logout().then(() => {
          console.log("logged out");
      });

  }

}