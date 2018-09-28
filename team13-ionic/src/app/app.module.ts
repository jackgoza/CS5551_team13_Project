import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { IntegrationsPage } from '../pages/integrations/integrations';
<<<<<<< HEAD
import { RegisterPage } from '../pages/register/register';
=======
import { ImagePage } from '../pages/image/image';
>>>>>>> master

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AboutPage,
    ContactPage,
    IntegrationsPage,
<<<<<<< HEAD
    RegisterPage
=======
    ImagePage
>>>>>>> master
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AboutPage,
    ContactPage,
    IntegrationsPage,
<<<<<<< HEAD
    RegisterPage
=======
    ImagePage
>>>>>>> master
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
