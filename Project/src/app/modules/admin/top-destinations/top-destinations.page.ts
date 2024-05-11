import { Component, OnInit } from '@angular/core';
import { TopDest, destination } from 'src/app/shared/models/topdest.interface';
import { DestinationService } from './destination.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-top-destinations',
  templateUrl: './top-destinations.page.html',
  styleUrls: ['./top-destinations.page.scss'],
})
export class TopDestinationsPage implements OnInit {

  destinations:destination[];

  constructor(private destinationService:DestinationService) { }

 
  ngOnInit() {
    this.getTopDest()
  }

  getTopDest() {
    this.destinationService.collection().valueChanges().subscribe((destination) => {
      this.destinations = destination;
      console.log("this.destinations", this.destinations);
  });
  }

}
