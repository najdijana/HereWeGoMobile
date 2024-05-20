import { Component, OnInit } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import { Guiders } from 'src/app/shared/models/guiders.interface';
import { Packages } from 'src/app/shared/models/packages.interface';
import { GuiderService } from '../service/guider.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-guider-detail',
  templateUrl: './guider-detail.page.html',
  styleUrls: ['./guider-detail.page.scss'],
})
export class GuiderDetailPage implements OnInit {

  guiders: Observable<Guiders>;
  packages: Observable<Packages[]>;

  constructor(
    private route: ActivatedRoute,
    private firestore: AngularFirestore
  ) {}
  ngOnInit() {
    const guiderId = this.route.snapshot.paramMap.get('id');
    this.guiders = this.firestore
      .collection<Guiders>('guiders')
      .doc(guiderId)
      .valueChanges();
    this.packages = this.firestore
      .collection<Guiders>('guiders')
      .doc(guiderId)
      .collection<Packages>('packages')
      .valueChanges();
  }

  open(url: string) {
    if (url) {
      window.open(url, '_blank');
    } else {
      console.error('No File URL found');
    }
  }
   
  addReview(){}

}
