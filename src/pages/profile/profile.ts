import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import firebase from 'firebase';
/**
 * Generated class for the ProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  csvItems:FirebaseListObservable<any>;
  constructor(public navCtrl: NavController,afDB: AngularFireDatabase, public navParams: NavParams) {
    this.csvItems = afDB.list('/newItems');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');

  }
}
