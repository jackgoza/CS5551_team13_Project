import { NgModule } from '@angular/core';
import {IonicPage, IonicPageModule} from 'ionic-angular';

import { ItemCreatePage } from './item-create';

@IonicPage()
@NgModule({
  declarations: [
    ItemCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(ItemCreatePage)
  ],
  exports: [
    ItemCreatePage
  ]
})
export class ItemCreatePageModule { }
