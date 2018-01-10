import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import {  AlertController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-pot',
  templateUrl: 'pot.html',


})

export class PotPage {
  decklog:FirebaseListObservable<any>;
  public csvItems : any;


  constructor(public navCtrl: NavController, public navParams: NavParams,angFire:AngularFireDatabase,public http   : Http)
    {
     this.csvItems=angFire.list('/newItems');

    }
  ionViewDidLoad() {
    console.log('ionViewDidLoad PotPage');
  }

potdetails(){
  this.navCtrl.push('ProfilePage');
}

checkCSV(){
  var updRef = firebase.database().ref("newItems/-KsXjN1VXdCmrvzaIUai");

  updRef.onDisconnect().update ({
   "PotID1": 100

});
}
  addCSV()
  {
     this.http.get('/assets/data/deck.csv')
     .map(res => res.text())
     .subscribe((data)=>
     {
        var csv         = this.parseCSVFile(data);
        this.csvItems  = csv;
      //  var txtFile = '/assets/data/test.txt';

  // var str = JSON.stringify(csv);
   //var file = new File(txtFile,"write");

  // var fs = require("fs");

  // fs.writeFile(txtFile, str, 'utf8');


     });


   var ref = firebase.database().ref().child("newItems");;
     ref.on('value', function(snapshot) {
    var count = 0;

    snapshot.forEach(function() {
        count++
          return false;
    }
   );
   ;
   var n = count.toString();
   document.getElementById("demopotno").innerHTML = n;
   document.getElementById("logdate").innerHTML = Date();
  // console.log(count)
   });



  }
  parseCSVFile(str)
  {
     var arr  = [],
         obj  = [],
         row,
         col,
         c,
         quote   = false;  // true means we're inside a quoted field

     // iterate over each character, keep track of current row and column (of the returned array)
     for (row = col = c = 0; c < str.length; c++)
     {
        var cc = str[c],
            nc = str[c+1];        // current character, next character

        arr[row]           = arr[row] || [];
        arr[row][col]  = arr[row][col] || '';

        /* If the current character is a quotation mark, and we're inside a
      quoted field, and the next character is also a quotation mark,
      add a quotation mark to the current column and skip the next character
        */
        if (cc == '"' && quote && nc == '"')
        {
           arr[row][col] += cc;
           ++c;
           continue;
        }


        // If it's just one quotation mark, begin/end quoted field
        if (cc == '"')
        {
           quote = !quote;
           continue;
        }


        // If it's a comma and we're not in a quoted field, move on to the next column
        if (cc == ',' && !quote)
        {
           ++col;
           continue;
        }


        /* If it's a newline and we're not in a quoted field, move on to the next
           row and move to column 0 of that new row */
        if (cc == '\n' && !quote)
        {
           ++row;
           col = 0;
           continue;
        }

        // Otherwise, append the current character to the current column
        arr[row][col] += cc;
     }

     return this.formatParsedObject(arr, true);
  }

  formatParsedObject(arr, hasTitles)
  {
     let PotID1 ,
         PotDepthTotalKept,
         TotalReturned,
         TotalKept,
         Time ,
         Date ,
         Latitude,
         Longitude,

         obj = [];

     for(var j = 0; j < arr.length; j++)
     {
        var items         = arr[j];

        if(items.indexOf("") === -1)
        {
           if(hasTitles === true && j === 0)
           {
              PotID1   = items[0];
              PotDepthTotalKept  = items[1];
              TotalKept    = items[2];
              TotalReturned = items[3];
              Time        = items[4];
              Date        = items[5];
              Latitude    = items[6];
              Longitude   = items[7];
           }
           else
           {

            this.csvItems.push({

                 PotID1          : items[0],
                 PotDepthTotalKept : items[1],
                 TotalKept   : items[2],
                 TotalReturned : items[3],
                 Time        : items[4],
                 Date        : items[5],
                 Latitude    :items[6],
                 Longitude   : items[7],
              });
           }
        }
     }
     return obj;
  }

}
