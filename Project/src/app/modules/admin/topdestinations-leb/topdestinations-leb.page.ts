import { Component, OnInit } from '@angular/core';
import { TopDestinationService } from '../top-destinations/destinations/service/topdestination.service';
import { Observable } from 'rxjs';
import { TopDest } from 'src/app/shared/models/topdest.interface';

@Component({
  selector: 'app-topdestinations-leb',
  templateUrl: './topdestinations-leb.page.html',
  styleUrls: ['./topdestinations-leb.page.scss'],
})
export class TopdestinationsLebPage implements OnInit {
  TopDest: Observable<TopDest[]>;

  constructor(private topDestinationService:TopDestinationService) {}

  ngOnInit() {
    this.TopDest=this.topDestinationService.collection().valueChanges();
  }

}
