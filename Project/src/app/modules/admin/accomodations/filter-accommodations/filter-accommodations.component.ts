import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-filter-accommodations',
  templateUrl: './filter-accommodations.component.html',
  styleUrls: ['./filter-accommodations.component.scss'],
})
export class FilterAccommodationsComponent  implements OnInit {

  cityFilter: string;
  priceFilter: {lower: number, upper: number} = { lower: 0, upper: 1000 };
  guestsFilter: number;
  wifiFilter: boolean = false;
  petsFilter: boolean = false;
  parkingFilter: boolean = false;

  constructor(private popoverController: PopoverController) {}

  applyFilters() {
    this.popoverController.dismiss({
      city: this.cityFilter,
      price: this.priceFilter,
      guests: this.guestsFilter,
      wifi: this.wifiFilter,
      pets: this.petsFilter,
      parking: this.parkingFilter
    });
  }

  ngOnInit() {}

}
