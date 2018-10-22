import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { MessagenewPage } from './messagenew';

@NgModule({
  declarations: [
    MessagenewPage,
  ],
  imports: [
    IonicPageModule.forChild(MessagenewPage)
  ],
  exports: [
    MessagenewPage
  ]
})
export class InfoPageModule { }
