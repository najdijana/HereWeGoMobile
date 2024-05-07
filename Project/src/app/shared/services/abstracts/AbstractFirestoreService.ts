import { AngularFirestoreCollection, AngularFirestoreDocument, QueryFn } from '@angular/fire/compat/firestore';
import { AngularFirestoreCollectionGroup } from '@angular/fire/compat/firestore/collection-group/collection-group';
import { QueryGroupFn } from '@angular/fire/compat/firestore/interfaces';
import { AbstractCollectionService } from './AbstractCollectionService';
import { AuthService } from '../auth.service';
import firebase from 'firebase/compat';
import WriteBatch = firebase.firestore.WriteBatch;

export abstract class AbstractFirestoreService<T> extends AbstractCollectionService<T> {

  CUSTOMER_PATH = 'users';

  COLLECTION: string;

  parentPath: string;

  disableRootPath = true;

  protected constructor(
    public authService: AuthService
  ) {
    super();
  }

  buildFirestorePath(targetPath: string): string {
    console.log('buildFirestorePath', targetPath);
    // if (this.disableRootPath) {
    //   if (this.authService?.userID) {
    //     console.log('customerID', this.authService.userID);
    //     const poolPath = `${this.CUSTOMER_PATH}/${this.authService.userID}/${targetPath}`;
    //     return poolPath;
    //   } else {
    //     // go to error page
    //     console.log('cannot build firestore path because customerID is not found');
    //   }
    // } else {
      return targetPath;
    // }
  }

  createID(): string {
    return this.authService.afs.createId();
  }

  batch(): WriteBatch {
    return this.authService.afs.firestore.batch();
  }

  collectionGroup(queryFn?: QueryGroupFn<T>): AngularFirestoreCollectionGroup<T> {
    if (!this.COLLECTION) {
      throw new Error('Please enter the collection name');
    }

    return this.authService.afs.collectionGroup<T>(this.buildFirestorePath(this.COLLECTION), queryFn);
  }

  collection(queryFn?: QueryFn): AngularFirestoreCollection<T> {
    console.log('collection --> parent', this.parentPath);
    if (!this.COLLECTION) {
      throw new Error('Please enter the collection name');
    }

    return this.authService.afs.collection<T>(this.buildFirestorePath(this.parentPath ? `${this.parentPath}/${this.COLLECTION}/` : `${this.COLLECTION}/`), queryFn);
  }

  collectionWithParent(parentPath: string, queryFn?: QueryFn): AngularFirestoreCollection<T> {
    console.log('collection --> parent', this.parentPath);
    if (!this.COLLECTION) {
      throw new Error('Please enter the collection name');
    }

    // return this.authService.afs.collection<T>(this.buildFirestorePath(`${this.COLLECTION}/`), queryFn);
    return this.authService.afs.collection<T>(this.buildFirestorePath(`${parentPath}/${this.COLLECTION}/`), queryFn);
  }

  doc(id: string): AngularFirestoreDocument<T> {
    console.log('doc --> parent', this.parentPath);
    if (!this.COLLECTION) {
      throw new Error('Please enter the collection name');
    }
    return this.authService.afs.doc<T>(this.buildFirestorePath(this.parentPath ? `${this.parentPath}/${this.COLLECTION}/${id}` : `${this.COLLECTION}/${id}`));
  }

  docWithParent(parentPath: string, id: string): AngularFirestoreDocument<T> {
    console.log('doc --> parent as param', parentPath);
    if (!this.COLLECTION) {
      throw new Error('Please enter the collection name');
    }
    return this.authService.afs.doc<T>(this.buildFirestorePath(`${parentPath}/${this.COLLECTION}/${id}`));
  }

  delete(id: string): Promise<void> {
    if (!this.COLLECTION) {
      throw new Error('Please enter the collection name');
    }
    return this.authService.afs.doc<T>(this.buildFirestorePath(this.parentPath ? `${this.parentPath}/${this.COLLECTION}/${id}` : `${this.COLLECTION}/${id}`)).delete();
  }

  reset(): void {
    this.parentPath = null;
    this.clearSelected();
  }

}
