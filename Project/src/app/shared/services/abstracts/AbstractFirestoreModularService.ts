import {
    addDoc,
    collection,
    collectionData,
    collectionGroup,
    deleteDoc,
    doc,
    Firestore,
    getDoc,
    query,
    setDoc,
    updateDoc,
    WriteBatch,
    writeBatch
} from '@angular/fire/firestore';
import {CollectionReference, DocumentData, DocumentReference, Query, QueryConstraint} from '@firebase/firestore';
import {AbstractCollectionService} from './AbstractCollectionService';
import {AuthService} from '../auth.service';
import firebase from "firebase/compat";
import UpdateData = firebase.firestore.UpdateData;


export abstract class AbstractFirestoreModularService<T> extends AbstractCollectionService<T> {

    CUSTOMER_PATH = 'Users';

    COLLECTION: string;

    parentPath: string;

    disableRootPath = true;

    protected constructor(
        public authService: AuthService,
        public firestore: Firestore
    ) {
        super();
        // import { enableIndexedDbPersistence } from 'firebase/firestore';
        // this.enableIndexedDbPersistence();
    }

    // enableIndexedDbPersistence() {
    //     enableIndexedDbPersistence(this.firestore)
    // }

    buildFirestorePath(targetPath: string): string {
        // console.log('buildFirestorePath', targetPath);
        // if (this.disableRootPath) {
        //     if (this.authService?.userID) {
        //         console.log('customerID', this.authService.userID);
        //         const poolPath = `${this.CUSTOMER_PATH}/${this.authService.userID}/${targetPath}`;
        //         return poolPath;
        //     } else {
        //         // go to error page
        //         console.log('cannot build firestore path because userID is not found');
        //     }
        // } else {
            return targetPath;
        // }
    }
    buildFirestoreGlobalPath(targetPath: string): string {
        console.log('buildFirestoreGlobalPath', targetPath);
        return targetPath;
    }

    createID(): string {
        // return doc(collection(this.firestore, 'id')).id;
        return this.authService.afs.createId();
    }

    batch(): WriteBatch {
        return writeBatch(this.firestore);
    }

    collectionGroup(): Query<DocumentData> {
        if (!this.COLLECTION) {
            throw new Error('Please enter the collection name');
        }
        return collectionGroup(this.firestore, this.buildFirestorePath(this.COLLECTION));
    }

    collection(): CollectionReference<DocumentData> {
        console.log('collection --> parent', this.parentPath);
        if (!this.COLLECTION) {
            throw new Error('Please enter the collection name');
        }

        return collection(this.firestore, this.buildFirestorePath(this.parentPath ? `${this.parentPath}/${this.COLLECTION}/` : `${this.COLLECTION}/`));
    }

    collectionWithParent(parentPath: string): CollectionReference<T> {
        console.log('collection --> parent', this.parentPath);
        if (!this.COLLECTION) {
            throw new Error('Please enter the collection name');
        }

        return collection(this.firestore, this.buildFirestorePath(`${parentPath}/${this.COLLECTION}/`)) as CollectionReference<T>;
    }

    doc(id: string): DocumentReference<T> {
        console.log('doc --> parent', this.parentPath);
        if (!this.COLLECTION) {
            throw new Error('Please enter the collection name');
        }
        return doc(this.firestore, this.buildFirestorePath(this.parentPath ? `${this.parentPath}/${this.COLLECTION}/${id}` : `${this.COLLECTION}/${id}`)) as DocumentReference<T>;
    }

    docWithParent(parentPath: string, id: string): DocumentReference<DocumentData> {
        console.log('doc --> parent as param', parentPath);
        if (!this.COLLECTION) {
            throw new Error('Please enter the collection name');
        }
        return doc(this.firestore, this.buildFirestorePath(`${parentPath}/${this.COLLECTION}/${id}`));
    }

    list<T>(...q: QueryConstraint[]) {
        return collectionData<T>(
            query<T>(
                this.collection() as CollectionReference<T>,
                ...q
            ), {idField: 'id' as keyof T & keyof NonNullable<T>}
        );
    }

    add(data: T) {
        const ref = this.collection();
        return addDoc<T>(ref as any, this.setUndefinedValuesToNull(data) as any);
    }

    set(id: string, data: T) {
        const ref = this.doc(id);
        return setDoc<T>(ref as any, this.setUndefinedValuesToNull(data) as any);
    }

    setWithMerge(id: string, data: T) {
        const ref = this.doc(id);
        return setDoc<T>(ref as any, this.setUndefinedValuesToNull(data) as any, {merge: true});
    }

    get(id: string) {
        const ref = this.doc(id);
        return getDoc<T>(ref as any);
    }

    update(id: string, data: T) {
        const ref = this.doc(id);
        return updateDoc<T>(ref as any, this.setUndefinedValuesToNull(data) as any);
    }

    delete(id: string): Promise<void> {
        if (!this.COLLECTION) {
            throw new Error('Please enter the collection name');
        }
        return deleteDoc(this.doc(id));
    }

    reset(): void {
        this.parentPath = null;
        this.clearSelected();
    }

    setUndefinedValuesToNull(data: T) {
        Object.keys(data).filter(k => data[k] == undefined).forEach(k => data[k] = null);
        return data as UpdateData;
    }

}
