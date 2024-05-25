import { Component, OnInit } from '@angular/core';
import { Accommodations } from 'src/app/shared/models/accommodations.interface';
import { AccommodationService } from './accomodations.service';
import { FilterAccommodationsComponent } from './filter-accommodations/filter-accommodations.component';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-accomodations',
  templateUrl: './accomodations.page.html',
  styleUrls: ['./accomodations.page.scss'],
})
export class AccomodationsPage implements OnInit {
  accommodations: Accommodations[];
  filteredAccommodations: Accommodations[] = [];
  allAccommodations: Accommodations[] = [];
  searchQuery: string = '';
  selectedSortOption: string = 'sort by';
  pagedPackages: Accommodations[] = [];
  pageSize: number = 6;
  totalPages: number;
  favoriteStatus: {[key: string]: boolean} = {};

  constructor(private accommodationService: AccommodationService,private popoverController:PopoverController) {}

  ngOnInit() {
    this.accommodationService.collection(ref => ref.where('published', '==', true))
    .valueChanges()
    .subscribe(data => {
      this.accommodations = data;
      this.allAccommodations = data;
      this.filteredAccommodations = data;
      data.forEach((destination: Accommodations) => {
        this.favoriteStatus[destination.id] = destination.isFavorite || false;
      });
      this.updatePagedPackages(0);
    });
}

  toggleFavorite(destination: Accommodations) {
    const isCurrentlyFavorite = this.favoriteStatus[destination.id] || false;
    this.favoriteStatus[destination.id] = !isCurrentlyFavorite;
    console.log("Selected Destination:", destination);
    console.log("Favorite Status:", this.favoriteStatus[destination.id]);

    const ref = this.accommodationService.doc(destination.id);
    return ref.update({ isFavorite: this.favoriteStatus[destination.id] });
  }

  filterAccommodations() {
    this.filteredAccommodations = this.allAccommodations.filter(acc => {
      const query = this.searchQuery.toLowerCase();
      console.log("query",query)
      console.log("query found",acc.Name.toLowerCase().includes(query))

      return acc.Name.toLowerCase().includes(query)
    });
    this.updatePagedPackages(0); // Reapply pagination
  }

  sortAccommodations() {
    switch (this.selectedSortOption) {
      case 'price-low-high':
        this.filteredAccommodations.sort((a, b) => a.Price - b.Price);
        break;
      case 'price-high-low':
        this.filteredAccommodations.sort((a, b) => b.Price - a.Price);
        break;
      case 'name-a-z':
        this.filteredAccommodations.sort((a, b) => a.Name.toLowerCase().localeCompare(b.Name.toLowerCase()));
        break;
      case 'name-z-a':
        this.filteredAccommodations.sort((a, b) => b.Name.toLowerCase().localeCompare(a.Name.toLowerCase()));
        break;
    }
    this.updatePagedPackages(0);
  }

  updatePagedPackages(pageIndex: number) {
    const startIndex = pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedPackages = this.filteredAccommodations.slice(startIndex, endIndex); // Adjust paged packages
  }

  loadMore(event) {
    setTimeout(() => {
      const nextPageIndex = this.pagedPackages.length / this.pageSize + 1;
      if (nextPageIndex <= this.totalPages) {
        this.updatePagedPackages(nextPageIndex);
      } else {
        event.target.disabled = true;
      }
      event.target.complete();
    }, 500);
  }

  async presentFilterPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: FilterAccommodationsComponent,
      event: ev,
      translucent: true
    });
    await popover.present();
  
    const { data } = await popover.onDidDismiss();
    if (data) {
      this.applyFilters(data);
    }
  }
  
  applyFilters(filters) {
    this.filteredAccommodations = this.accommodations.filter(acc => {
      const priceMatch = acc.Price >= filters.price.lower && acc.Price <= filters.price.upper;
      const cityMatch = filters.city ? acc.City.toLowerCase().includes(filters.city.toLowerCase()) : true;
      const guestsMatch = filters.guests ? acc.Nb_guests >= filters.guests : true;
      const wifiMatch = filters.wifi ? acc.Wifi === filters.wifi : true;
      const petsMatch = filters.pets ? acc.Pets === filters.pets : true;
      const parkingMatch = filters.parking ? acc.Parking === filters.parking : true;
  
      return priceMatch && cityMatch && guestsMatch && wifiMatch && petsMatch && parkingMatch;
    });
  
    this.updatePagedPackages(0);
  }
}
