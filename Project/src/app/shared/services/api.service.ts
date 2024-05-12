import { Injectable } from '@angular/core';
import { collectionData } from '@angular/fire/firestore';
import { Firestore, collection, doc, query, setDoc, where } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private firestore: Firestore,) { }

  docRef(path) {
    return doc(this.firestore, path)
  }
  
  collectionRef(path) {
    return collection(this.firestore, path)
  }

  setDocument(path: string, data: any) {
    const dataRef = this.docRef(path);
    return setDoc(dataRef, data);
  }
  collectionDataQuery(path, queryFn?) {
    let dataRef: any = this.collectionRef(path);
    if (queryFn) {
      const q = query(dataRef, queryFn);
      dataRef = q;
    }
    const collection_data = collectionData<any>(dataRef);
    return collection_data;
  }

  whereQuery(fieldPath, condition, value){
    return where(fieldPath, condition, value);

  }
}
