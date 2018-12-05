import { Component } from '@angular/core';
import { IonicPage, MenuController, NavController, Platform } from 'ionic-angular';

export interface Slide {
  title: string;
  description: string;
  image: string;
}

@IonicPage()
@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html'
})
export class TutorialPage {
  slides: Slide[];
  showSkip = true;
  dir: string = 'ltr';

  constructor(public navCtrl: NavController, public menu: MenuController, public platform: Platform) {
    this.dir = platform.dir();
    // @ts-ignore
    this.slides = [
      {
        title: "Welcome to the DealSuperior",
        description: "In this App <b>DealSuperior</b>. You can find the best deal for the product you want to buy, not just the <b>PRICE</b>!",
        image: 'assets/img/ica-slidebox-img-1.png',
      },
      {
        title: "How to find the best deal",
        description: "When you search the product, not just the information from third parties, the recommendation or the best deal from other customers will show for you",
        image: 'assets/img/ica-slidebox-img-2.png',
      },
      {
        title: "More fun?",
        description: "We also provide that you can use your camera to take a picture of product, and <b>DealSuperior</b> will know what you want",
        image: 'assets/img/ica-slidebox-img-3.png',
      }
      ];
  }

  startApp() {
    this.navCtrl.setRoot('WelcomePage', {}, {
      animate: true,
      direction: 'forward'
    });
  }

  onSlideChangeStart(slider) {
    this.showSkip = !slider.isEnd();
  }

  ionViewDidEnter() {
    // the root left menu should be disabled on the tutorial page
    this.menu.enable(false);
  }

  ionViewWillLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menu.enable(true);
  }

}
