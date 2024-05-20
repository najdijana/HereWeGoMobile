import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Guiders } from 'src/app/shared/models/guiders.interface';

@Component({
  selector: 'app-guider',
  templateUrl: './guider.page.html',
  styleUrls: ['./guider.page.scss'],
})
export class GuiderPage implements OnInit {

  guiders$: Observable<Guiders[]>;

  constructor(private firestore: AngularFirestore) {}

  ngOnInit() {
    this.guiders$ = this.firestore.collection<Guiders>('guiders').valueChanges();
  }
}


