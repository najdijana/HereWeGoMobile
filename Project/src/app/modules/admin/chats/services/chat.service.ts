import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user.interface';
import { ApiService } from 'src/app/shared/services/api.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class ChatService {
/*
    currentUserId: string;
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