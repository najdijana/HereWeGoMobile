import { Injectable } from '@angular/core';
import { collectionData, docData } from '@angular/fire/firestore';
import { Firestore, collection, doc, query, setDoc, where, addDoc, getDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private firestore: Firestore,) { }
  /*
   
  
   
    setDocument(path: string, data: any) {
      const dataRef = this.docRef(path);
      return setDoc(dataRef, data);
    }
  
   addDocument(path, data){
    const dataRef = this.collectionRef(path);
    return addDoc(dataRef, data)
   }
    
   
    getDocs(path, queryFn?) {
      let dataRef: any = this.collectionRef(path);
      if (queryFn) {
        const q = query(dataRef, queryFn);
        dataRef = q;
  }
  return this.getDocs(dataRef);
    }*/
    
    getDocsbyId(path) {
      const dataRef = this.docRef(path);
      return getDoc(dataRef)
    }

    collectionRef(path) {
      return collection(this.firestore, path)
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
  
    whereQuery(fieldPath, condition, value) {
      return where(fieldPath, condition, value);
    }
  
  docRef(path) {
    return doc(this.firestore, path)
  }

  docDataQuery(path, id?, queryFn?) {
    let dataRef: any = this.docRef(path);
    if (queryFn) {
      const q = query(dataRef, queryFn);
      dataRef = q;
    }
    let doc_data;
    if (id) doc_data = docData<any>(dataRef, { idField: 'id' });
    else doc_data = docData<any>(dataRef);
    return doc_data;
  }
}
