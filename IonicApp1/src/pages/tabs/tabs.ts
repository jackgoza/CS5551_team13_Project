import { Component } from '@angular/core';
import {IonicPage, NavController, ToastController} from 'ionic-angular';
import { Tab1Root, Tab2Root, Tab3Root, Tab4Root, Tab5Root, Tab6Root } from '../';
import {Profile} from "../../models/profile";
import {AngularFireAuth} from "angularfire2/auth";
import 'rxjs/add/operator/take';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root: any = Tab1Root;
  tab2Root: any = Tab2Root;
  tab3Root: any = Tab3Root;
  tab4Root: any = Tab4Root;
  tab5Root: any = Tab5Root;
  tab6Root: any = Tab6Root;

  tab1Title = " ";
  tab2Title = " ";
  tab3Title = " ";
  tab4Title = " ";
  tab5Title = " ";
  tab6Title = " ";

  profileData: FirebaseListObservable<Profile>;

  constructor(
    private toast: ToastController,
    private afAuth: AngularFireAuth,
    private afDatabase: AngularFireDatabase,
    public navCtrl: NavController) {
    this.tab1Title = "Home";
    this.tab2Title = "Map";
    this.tab3Title = "Search";
    this.tab4Title = "Message";
    this.tab5Title = "User";
    this.tab6Title = "World";
  }
  ionViewWillLoad() {
    this.afAuth.authState.take(1).subscribe(data =>{
      if(data && data.email && data.uid) {
        this.toast.create({
          message: "Welcome to DealSuperior",
          duration: 2000,
          position: 'top'
        }).present();
        // @ts-ignore
        this.profileData = this.afDatabase.object(`profile/${data.uid}`)
      }
      else {
        this.toast.create({
          message: 'Could not find authentication details',
          duration: 2000,
          position: 'top'
        }).present();
      }
    });
  }


}
