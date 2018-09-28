import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GooglePlus } from 'ionic-native';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { IntegrationsPage } from '../integrations/integrations';
<<<<<<< HEAD
import { RegisterPage } from '../register/register';
=======
import { ImagePage } from '../image/image';
>>>>>>> master

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  register() {
      this.navCtrl.push(RegisterPage);
  }

  login() {
    console.log("your mom loves you, but not that much");
  }

  loginWithGoogle(){ 
    GooglePlus.login({
      'webClientId': '164159689649-mgq2po8ev40f9k4lkcdcrmbeorv0qbuo.apps.googleusercontent.com'
    }).then((res) => {
        console.log(res);
    }, (err) => {
        console.log(err);
    });
}

// logout(){
//     GooglePlus.logout().then(() => {
//         console.log("logged out");
//     });
// }

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

goToImage() {
    console.log("Image");
    this.navCtrl.push(ImagePage);
}

}
