import { Injectable } from '@angular/core';
import { user } from '@angular/fire/auth';
import { collection, orderBy, query, where } from 'firebase/firestore';
import { Observable, map, of, switchMap } from 'rxjs';
import { User } from 'src/app/shared/models/user.interface';
import { ApiService } from 'src/app/shared/services/api.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class ChatService {
    constructor(public auth: AuthService, private api: ApiService) { }
    currentUserId: string;

   
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