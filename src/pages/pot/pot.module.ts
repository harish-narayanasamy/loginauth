import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PotPage } from './pot';

@NgModule({
  declarations: [
    PotPage,
  ],
  imports: [
    IonicPageModule.forChild(PotPage),
  ],
})
export class PotPageModule {}
