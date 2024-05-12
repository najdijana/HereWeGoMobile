import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-filter-activities',
  templateUrl: './filter-activities.component.html',
  styleUrls: ['./filter-activities.component.scss'],
})
export class FilterActivitiesComponent  implements OnInit {
  minPrice?: number; // Optional min price
  maxPrice?: number;
  typeFilter: string;
  locationFilter: string;

  constructor(private popoverController: PopoverController) {}

  ngOnInit() {}

  applyFilters() {
    // Emit filter options to be passed back to the parent component
    this.popoverController.dismiss({
      minPrice: this.minPrice,
      maxPrice: this.maxPrice,
      typeFilter: this.typeFilter,
      locationFilter: this.locationFilter
    });
  }
}