import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-filter-destinations',
  templateUrl: './filter-destinations.component.html',
  styleUrls: ['./filter-destinations.component.scss'],
})
export class FilterDestinationsComponent  implements OnInit {

  city: string;
  minPrice: number;
  maxPrice: number;
  activity: string;
  cities: string[] = []; 
  activities: string;

  constructor(private popoverController: PopoverController) {}
  ngOnInit(): void {
  }

  applyFilters() {
    this.popoverController.dismiss({
      city: this.city,
      minPrice: this.minPrice,
      maxPrice: this.maxPrice,
      activity: this.activity
    });
  }
}
