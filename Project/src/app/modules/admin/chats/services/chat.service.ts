import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject, Observable, catchError, forkJoin, from, map, of, switchMap, take, tap } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class ChatService {
    private chatRoomsSubject = new BehaviorSubject<any[]>([]);
    private isLoading = false;
    chatRooms$ = this.chatRoomsSubject.asObservable();
  
    constructor(private firestore: AngularFirestore) {}
  
    loadChatRoomsAndUsers(uid: string): void {
      if (this.isLoading) {
        return;
      }
  
      this.isLoading = true;
  
      this.firestore.collection('chatRooms', ref => ref.where('members', 'array-contains', uid)).snapshotChanges().pipe(
        take(1),  // Ensure the observable completes after the first emission
        tap(chatRooms => {
          console.log('Chat Rooms:', chatRooms);
        }),
        switchMap(chatRooms => {
          const otherIds = chatRooms.map(a => {
            const data = a.payload.doc.data() as any;
            return data.members.find(member => member !== uid);
          });
  
          console.log('Other IDs:', otherIds);
  
          const uniqueOtherIds = Array.from(new Set(otherIds));
  
          const userRequests = uniqueOtherIds.map(otherId => {
            console.log('Current Other ID:', otherId);
            return this.firestore.collection('users', ref => ref.where('uid', '==', otherId)).valueChanges().pipe(
              take(1),  // Ensure the observable completes after the first emission
              tap(user => {
                console.log('Fetched User for otherId', otherId, ':', user);
              })
            );
          });
  
          return forkJoin(userRequests);
        }),
        map(users => {
          console.log('Users:', users);
          return [].concat(...users);
        })
      ).subscribe(users => {
        this.chatRoomsSubject.next(users);
        this.isLoading = false;
      }, error => {
        console.error('Error fetching chat rooms and users:', error);
        this.isLoading = false;
      });
    }
    /*
    async createChatRooms(user_id) {
        try {
            let room: any;
            const querySnapshot = await this.api.getDocs(
                'chatRooms',
                this.api.whereQuery(
                    'members',
                    'in',
                    [[user_id, this.currentUserId], [this.currentUserId, user_id]]
                )
            );
            room = await querySnapshot.docs.map((doc: any) => {
                let item = doc.data();
                item.id = doc.id;
                return item
            });
            console.log('exists room', room)
            if (room?.length > 0)
                return room[0];

            const data = {
                members: [
                    this.currentUserId,
                    user_id
                ],
                type: 'private',
                createdAt: new Date(),
                updatedAt: new Date(),
            };
            room = await this.api.addDocument('chatRooms', data);
            return room;
        }
        catch (e) {
            throw (e);
        }
    }
    /*
        
    public users: Observable<any[]>;
    
    
        constructor(public auth:  AuthService, private api: ApiService){
            this.getId();
        }
    
        getId(){
            this.currentUserId=this.auth.authUser.uid;
        }
    
        getUsers(){
            this.users=this.api.collectionDataQuery(
                'users', this.api.whereQuery('uid', '!=', this.currentUserId)
            );
        }
        */


       
                    
}