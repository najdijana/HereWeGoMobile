import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TopDestinationService } from './service/topdestination.service';
import { Observable } from 'rxjs';
import { TopDest } from 'src/app/shared/models/topdest.interface';

@Component({
  selector: 'app-destinations',
  templateUrl: './destinations.page.html',
  styleUrls: ['./destinations.page.scss'],
})
export class DestinationsPage implements OnInit {

  public destinationName: string;
  TopDest: Observable<TopDest[]>;

  private activatedRoute = inject(ActivatedRoute);
  constructor(private topDestinationService:TopDestinationService) {}

  ngOnInit() {
    this.destinationName = this.activatedRoute.snapshot.paramMap.get('name');
    console.log("this.destinationName",this.destinationName)

    this.TopDest=this.topDestinationService.collection((ref) =>
      ref.where('Governate', '==', this.destinationName)
    ).valueChanges();
  }

}
