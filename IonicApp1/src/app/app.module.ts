import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Camera } from '@ionic-native/camera';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule, Storage } from '@ionic/storage';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import { Items } from '../mocks/providers/items';
import { Settings, User, Api } from '../providers';
import { MyApp } from './app.component';

import {MovieService} from "../services/rest/movie-service";
import {APIInfoPage} from "../pages/APIinfo/APIinfo";
import {HttpModule} from "@angular/http";
import { LoginServiceProvider } from '../providers/login-service/login-service';
import {GooglePlus} from "@ionic-native/google-plus";
import {NativeStorage} from "@ionic-native/native-storage";

import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {FIREBASE_CONFIG} from "./app.firebase.config";
import {AngularFireAuthModule} from  "angularfire2/auth";
import {ItemCreatePage} from "../pages/item-create/item-create";
import firebase from 'firebase';
firebase.initializeApp(FIREBASE_CONFIG);

import {Base64} from '@ionic-native/base64'

export function provideSettings(storage: Storage) {
  /**
   * The Settings provider takes a set of default settings for your app.
   *
   * You can add new settings options at any time. Once the settings are saved,
   * these values will not overwrite the saved values (this can be done manually if desired).
   */
  return new Settings(storage, {
    option1: true,
    option2: 'Ionitron J. Framework',
    option3: '3',
    option4: 'Hello'
  });
}

@NgModule({
  declarations: [
    MyApp,
    APIInfoPage,
    ItemCreatePage,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    APIInfoPage,
    ItemCreatePage,
  ],
  providers: [
    Api,
    Items,
    User,
    Camera,
    SplashScreen,
    StatusBar,
    MovieService,
    Base64,
    GooglePlus,
    NativeStorage,
    { provide: Settings, useFactory: provideSettings, deps: [Storage] },
    // Keep this to enable Ionic's runtime error handling during development
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    LoginServiceProvider
  ]
})
export class AppModule { }
