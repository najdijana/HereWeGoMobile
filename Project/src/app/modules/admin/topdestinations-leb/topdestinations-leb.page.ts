import { Component, OnInit } from '@angular/core';
import { TopDestinationService } from '../top-destinations/destinations/service/topdestination.service';
import { Observable } from 'rxjs';
import { TopDest } from 'src/app/shared/models/topdest.interface';
import { PopoverController } from '@ionic/angular';
import { FilterDestinationsComponent } from './filter-destinations/filter-destinations.component';

@Component({
  selector: 'app-topdestinations-leb',
  templateUrl: './topdestinations-leb.page.html',
  styleUrls: ['./topdestinations-leb.page.scss'],
})
export class TopdestinationsLebPage implements OnInit {
  topDestinations: TopDest[];
  pagedDestinations: TopDest[] = [];
  filteredDestinations: TopDest[] = [];
  allDestinations: TopDest[] = [];
  searchQuery: string = '';
  selectedSortOption: string = 'sort by';
  pageSize: number = 6;
  totalPages: number;

  city: string;
  minPrice: number;
  maxPrice: number;
  activity: string;

  constructor(private topDestinationService: TopDestinationService, private popoverController: PopoverController) {}

  ngOnInit() {
    this.topDestinationService.collection().valueChanges().subscribe(data => {
      this.topDestinations = data;
      this.allDestinations = data;
      this.filteredDestinations = data;
      this.updatePagedDestinations(0);
    });
  }

  updatePagedDestinations(pageIndex: number) {
    const startIndex = pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedDestinations = this.filteredDestinations.slice(startIndex, endIndex);
  }

  loadMore(event) {
    setTimeout(() => {
      const nextPageIndex = this.pagedDestinations.length / this.pageSize+1;
      if (nextPageIndex <= this.totalPages) {
        this.updatePagedDestinations(nextPageIndex);
      } else {
        event.target.disabled = true;
      }
      event.target.complete();
    }, 500);
  }

  filterDestinations() {
    this.filteredDestinations = this.allDestinations.filter(dest => {
      const query = this.searchQuery.toLowerCase();
      return dest.Name.toLowerCase().includes(query);
    });
    this.updatePagedDestinations(0);
  }

  sortDestinations() {
    switch (this.selectedSortOption) {
      case 'name-a-z':
        this.filteredDestinations.sort((a, b) => a.Name.localeCompare(b.Name));
        break;
      case 'name-z-a':
        this.filteredDestinations.sort((a, b) => b.Name.localeCompare(a.Name));
        break;
      case 'city-a-z':
        this.filteredDestinations.sort((a, b) => a.City.localeCompare(b.City));
        break;
      case 'city-z-a':
        this.filteredDestinations.sort((a, b) => b.City.localeCompare(a.City));
        break;
      // Implement other sorting options as needed
    }
    this.updatePagedDestinations(0);
  }

  async presentFilterPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: FilterDestinationsComponent,
      event: ev,
      translucent: true,
    });

    popover.onDidDismiss().then(data => {
      if (data && data.data) {
        const filterOptions = data.data;
        // Apply filtering logic with filterOptions
        this.minPrice = filterOptions.minPrice;
        this.maxPrice = filterOptions.maxPrice;
        this.city = filterOptions.city;
        this.activity = filterOptions.activity;
        this.filterDestinations();
        this.applyFilters(filterOptions);
      }
    });

    await popover.present();
  }

  applyFilters(filters: any) {
    this.filteredDestinations = this.allDestinations.filter(dest => {
      return (!filters.city || dest.Governate === filters.city) &&
             (!filters.minPrice || dest.Price >= filters.minPrice) &&
             (!filters.maxPrice || dest.Price <= filters.maxPrice) &&
             (!filters.activity || dest.Activity.toLowerCase().includes(filters.activity.toLowerCase()));
    });
    this.updatePagedDestinations(0);
  }
}
  


  // sortPackages() {
  //   switch (this.selectedSortOption) {
  //       case 'name-a-z':
  //         this.filteredPackages.sort((a, b) => {
  //           const nameA = a.Name?.toLowerCase();
  //           const nameB = b.Name?.toLowerCase();
  //           if (!nameA || !nameB) {
  //             console.error('Invalid package name found:', a.Name, b.Name);
  //             return 0; // Handle invalid data by leaving the order unchanged
  //           }
  //           return nameA.localeCompare(nameB);
  //         });
  //         break;
  //       case 'name-z-a':
  //         this.filteredPackages.sort((a, b) => {
  //           const nameA = b.Name?.charAt(0).toLowerCase();
  //           const nameB = a.Name?.charAt(0).toLowerCase();
  //           return nameA.localeCompare(nameB);
  //         });
  //         break;
  //         case 'reviews-low-high':
  //           this.filteredPackages.sort((a, b) => a.review - b.review);
  //           break;
  //         case 'reviews-high-low':
  //           this.filteredPackages.sort((a, b) => b.review - a.review);
  //           break;
  //   }

  //   this.updatePagedPackages(0); // Reapply pagination
    
  // }

