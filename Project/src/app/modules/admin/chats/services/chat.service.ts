import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject, Observable, Subject, catchError, combineLatest, debounceTime, forkJoin, from, map, of, switchMap, take, takeUntil, tap } from 'rxjs';
import { User } from 'src/app/shared/models/user.interface';
import { AuthService } from 'src/app/shared/services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class ChatService {
    private chatRoomsSubject = new BehaviorSubject<any[]>([]);
  private isLoading = false;
  private unsubscribeAll = new Subject<void>();
  chatRooms$ = this.chatRoomsSubject.asObservable();

  constructor(private firestore: AngularFirestore) {}

  loadChatRoomsAndUsers(uid: string): void {
    if (this.isLoading) {
      return;
    }

    this.isLoading = true;

    this.firestore.collection('chatRooms', ref => ref.where('members', 'array-contains', uid)).snapshotChanges().pipe(
      takeUntil(this.unsubscribeAll),
      debounceTime(250),
      tap(() => {
        console.log('loading ...');
        this.isLoading = true;
      }),
      switchMap(chatRooms => {
        const rooms = chatRooms.map(a => {
          const data = a.payload.doc.data() as any;
          const roomId = a.payload.doc.id;
          const otherId = data.members.find(member => member !== uid);
          return { roomId, otherId };
        });

        console.log('Rooms:', rooms);

        const uniqueOtherIds = Array.from(new Set(rooms.map(r => r.otherId)));

        const userRequests = uniqueOtherIds.map(otherId => {
          console.log('Current Other ID:', otherId);
          return this.firestore.collection('users', ref => ref.where('uid', '==', otherId)).valueChanges().pipe(
            take(1),  // Ensure the observable completes after the first emission
            map((users: User[]) => users[0]), // Assuming there's only one document per uid
            tap(user => {
              console.log('Fetched User for otherId', otherId, ':', user);
            }),
            map(user => ({
              ...user,
              roomId: rooms.find(r => r.otherId === otherId)?.roomId
            }))
          );
        });

        return forkJoin(userRequests) as Observable<User[]>;
      }),
      map((users: User[]) => {
        console.log('Users:', users);
        return users;
      })
    ).subscribe(users => {
      this.chatRoomsSubject.next(users);
      this.isLoading = false;
    }, error => {
      console.error('Error fetching chat rooms and users:', error);
      this.isLoading = false;
    });
  }

  unsubscribe(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
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