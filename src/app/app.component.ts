import { Component } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';

@Component({
  selector: 'bs-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'bs';

  // items: Observable<any[]>;
  //
  // constructor(db: AngularFirestore) {
  //   this.items = db.collection('clients').valueChanges();
  // }

}
