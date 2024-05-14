import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ModalController, PopoverController } from '@ionic/angular';
import { Observable, Subject, catchError, distinctUntilChanged, first, forkJoin, map, of, switchMap, take, takeUntil, tap } from 'rxjs';
import { User } from 'src/app/shared/models/user.interface';
import { ChatService } from './services/chat.service';
import { UserService } from 'src/app/shared/services/user.service';
import { DocumentData, addDoc, collection, doc, getDoc, getDocs, orderBy, query, where } from 'firebase/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.page.html',
  styleUrls: ['./chats.page.scss'],
})
export class ChatsPage implements OnInit , OnDestroy{

  @ViewChild('new_chat') modal: ModalController;
  @ViewChild('popover') popover: PopoverController;

  open_new_chat = false;
  users: User[];
  uid: string;
  chatRooms: any;
  otherUsers: any[];

  constructor(
    private router: Router,
    private userService: UserService,
    private firestore: AngularFirestore,
    // private api : ApiService,
     
    //private Afirestore: Firestore,
     private chatService : ChatService

  ) {
    this.uid = this.userService.authService.authUser.uid;
   }

  unsubscribeAll: Subject<any> = new Subject<any>();




  ngOnInit(): void {
    this.chatService.loadChatRoomsAndUsers(this.uid);

      this.chatService.chatRooms$.subscribe(users => {
        console.log(users);
        this.chatRooms = users.map(user => ({
          roomId: user.roomId, // Ensure 'roomId' is correctly set
          profilePicture: user.profilePicture,
          displayName: user.displayName,
          firstName: user.firstName,
          lastName: user.lastName
        }));
      });
  }

  ngOnDestroy(): void {
    this.chatService.unsubscribe();
  }


  getUsers() {
    this.userService.collection((ref) =>
      ref.where('uid', '!=', this.uid)
    ).valueChanges().subscribe(users => {
      this.users = users;
      console.log("Users data fetched:", this.users);
    });
  }
  getUser(user) {
    return user
  }
  newChat() {
    this.open_new_chat = true;
    console.log("A new chat is being opened.");
    if (!this.users) {
      console.log("Users data is not available. Fetching users data...");
      this.getUsers();
    } else {
      console.log("Existing users data:", this.users);
    }
  }

  async createChatRoom(user_id: string) {
    try {
      let room: any;

      const q = query(collection(this.firestore.firestore, 'chatRooms'),
        where('members', 'in', [[user_id, this.uid], [this.uid, user_id]]));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        //   console.log('data from chatRooms', doc.data());
        // Process each document here
      });


      room = await querySnapshot.docs.map((doc: any) => {
        let item = doc.data();
        item.id = doc.id;
        return item
      });
      console.log('existing room', room)
      if (room?.length > 0)
        return room[0];

      const data = {
        members: [this.uid, user_id],
        type: 'private',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const roomRef = await addDoc(collection(this.firestore.firestore, 'chatRooms'), data);
      //  console.log('New room added with ID:', roomRef.id);
      return roomRef;
    } catch (e) {
      //    console.error('Error creating chatroom:', e);
      throw (e);
    }
  }

  onWillDismiss(event: any) { }

  cancel() {
    this.modal.dismiss();
    this.open_new_chat = false;
  }


  async startChat(item) {
    try {
      const roomRef = await this.createChatRoom(item?.uid);
     console.log('room reference', roomRef);
      this.cancel();
      this.navigateToChatRoom(roomRef.id, item.displayName);
    } catch (e) {
         console.error('Failed to start chat:', e);
    }
  }

  navigateToChatRoom(roomId: string, displayName: string) {
    const navData: NavigationExtras = {
      queryParams: {
        name: displayName,
      }
    };
    this.router.navigate(['/', 'chats', 'chat-conv', roomId], navData);
  }

  getChat(item) {
     console.log('Navigating to chat with item:', item); // Log the item
    if (!item.roomId) {
      console.error('Error: roomId is undefined');
      return;
    }
    const displayName = item.displayName;
    const navData: NavigationExtras = {
      queryParams: {
        name: displayName,
      }
    };
    this.router.navigate(['/', 'chats', 'chat-conv', item.roomId], navData);
  }


  getChatRoomsByUser(currentUserUid: string): Observable<any[]> {
    return this.firestore.collection('chatRooms', ref => ref.where('members', 'array-contains', currentUserUid))
      .snapshotChanges()
      .pipe(
        map(actions => {
          const chatRooms = actions.map(a => {
            const data = a.payload.doc.data() as any;
            const id = a.payload.doc.id;
            return { id, ...data };
          });
          console.log('Chat rooms:', chatRooms); // Log the retrieved chat rooms
          return chatRooms;
        })
      );
  }

  getOtherIdsFromChatRooms(chatRooms: any[], currentUserUid: string): string[] {
    const otherIds = chatRooms
      .map(chatRoom => chatRoom.members.find((member: string) => member !== currentUserUid))
      .filter(id => id !== undefined); // Ensure no undefined IDs are included

    // Remove duplicates
    const uniqueOtherIds = Array.from(new Set(otherIds));

    console.log('Other IDs:', uniqueOtherIds); // Log the extracted other IDs
    // console.log('test')
    return uniqueOtherIds;
  }

  getUsersByIds(otherIds: string[]): Observable<any[]> {
    if (otherIds.length === 0) {
      console.log('No other IDs found'); // Log if no other IDs
      return of([]); // Return an empty array if no otherIds
    }

    const usersCollection = this.firestore.collection('users', ref => ref.where('uid', 'in', otherIds));
    return usersCollection.snapshotChanges().pipe(
      map(actions => {
        const users = actions.map(a => {
          const data = a.payload.doc.data() as any;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
        console.log('Users:', users); // Log the retrieved users
       // console.log('user test')
        return users;
      })
    );
  }

  getOtherUsersInChatRooms(currentUserUid: string): Observable<any[]> {
    return this.getChatRoomsByUser(currentUserUid).pipe(
      map(chatRooms => this.getOtherIdsFromChatRooms(chatRooms, currentUserUid)),
      switchMap(otherIds => this.getUsersByIds(otherIds))
    );
  }
}

