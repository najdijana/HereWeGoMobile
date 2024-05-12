import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-filter-restaurants',
  templateUrl: './filter-restaurants.component.html',
  styleUrls: ['./filter-restaurants.component.scss'],
})
export class FilterRestaurantsComponent  implements OnInit {
  typeFilter: string = '';
  mealsFilter: string[] = [];
  cityFilter: string = '';
  cuisineFilter: string = '';

  constructor(private popoverController: PopoverController) {}
  ngOnInit(): void {
  }

  applyFilters() {
    this.popoverController.dismiss({
      type: this.typeFilter,
      meals: this.mealsFilter,
      city: this.cityFilter,
      cuisine: this.cuisineFilter
    });
  }

}
