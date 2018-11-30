import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { WorldPage } from './world';

@NgModule({
  declarations: [
    WorldPage,
  ],
  imports: [
    IonicPageModule.forChild(WorldPage)
  ],
  exports: [
    WorldPage
  ]
})
export class WorldPageModule { }
