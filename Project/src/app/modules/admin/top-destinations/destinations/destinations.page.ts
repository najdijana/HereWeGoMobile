import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TopDestinationService } from './service/topdestination.service';
import { Observable } from 'rxjs';
import { TopDest } from 'src/app/shared/models/topdest.interface';
import { User } from 'src/app/shared/models/user.interface';
import { UserService } from 'src/app/shared/services/user.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-destinations',
  templateUrl: './destinations.page.html',
  styleUrls: ['./destinations.page.scss'],
})
export class DestinationsPage implements OnInit {

  public destinationName: string;
  TopDest: Observable<TopDest[]>;
  user: User;

  private activatedRoute = inject(ActivatedRoute);
  constructor(private topDestinationService:TopDestinationService, private userService: UserService,private authService:AuthService) {}

  ngOnInit() {
    this.user = this.authService.authUser;
    console.log("user",this.user)

    this.destinationName = this.activatedRoute.snapshot.paramMap.get('name');
    console.log("this.destinationName",this.destinationName)

    this.TopDest=this.topDestinationService.collection((ref) =>
      ref.where('Governate', '==', this.destinationName)
    ).valueChanges();
  }
  

}
