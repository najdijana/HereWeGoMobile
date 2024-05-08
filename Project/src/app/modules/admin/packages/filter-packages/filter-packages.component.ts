import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-filter-packages',
  templateUrl: './filter-packages.component.html',
  styleUrls: ['./filter-packages.component.scss'],
})
export class FilterPackagesComponent  implements OnInit {
  minPrice?: number; // Optional min price
  maxPrice?: number;
  daysFilter: number;
  personsFilter: number;

  constructor(private popoverController: PopoverController) {}

  ngOnInit() {}

  applyFilters() {
    // Emit filter options to be passed back to the parent component
    this.popoverController.dismiss({
      minPrice: this.minPrice,
      maxPrice: this.maxPrice,
      daysFilter: this.daysFilter,
      personsFilter: this.personsFilter
    });
  }
}