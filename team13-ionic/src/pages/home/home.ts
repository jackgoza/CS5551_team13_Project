import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GooglePlus } from 'ionic-native';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { IntegrationsPage } from '../integrations/integrations';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  login(){
 
    GooglePlus.login({
      'webClientId': '164159689649-mgq2po8ev40f9k4lkcdcrmbeorv0qbuo.apps.googleusercontent.com'
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

goToAbout() {
    console.log("About button pushed");
    this.navCtrl.push(AboutPage);
}

goToContact() {
    console.log("Contact button pushed");
    this.navCtrl.push(ContactPage);
}

goToIntegrations() {
    console.log("Integrations!");
    this.navCtrl.push(IntegrationsPage);
}

}
