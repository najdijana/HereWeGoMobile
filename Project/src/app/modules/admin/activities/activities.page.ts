import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Activities } from 'src/app/shared/models/activities.interface';
import { ActivitiesService } from './services/activities.services';
import { FilterActivitiesComponent } from './filter-activities/filter-activities.component';
import { UserService } from 'src/app/shared/services/user.service';
import { User } from 'src/app/shared/models/user.interface';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.page.html',
  styleUrls: ['./activities.page.scss'],
})
export class ActivitiesPage implements OnInit {
  activities: Activities[];
  pagedActivities: Activities[] = [];
  filteredActivities: Activities[] = []; // Filtered list
  allActivities: Activities[] = []; // Original list
  searchQuery: string = ''; // Search variable
  minPrice?: number; // Optional min price
  maxPrice?: number; // Optional max price
  pageSize: number = 6;
  typeFilter?: string;
  locationFilter?: string;
  selectedSortOption: string = 'sort by'; // Default sort option
  totalPages: number;
  favoriteStatus: {[key: string]: boolean} = {};
  user: User;

  constructor(private activitiesService: ActivitiesService, private popoverController: PopoverController, private userService: UserService,private authService:AuthService) {}

  ngOnInit() {
    this.user = this.authService.authUser;
    console.log("user",this.user)
    this.getActivities();
    this.getUserFavorites().subscribe(favorites => {
      favorites.forEach(favorite => {
        this.favoriteStatus[favorite.id] = true;
      });
    });
  }

  getActivities() {
    this.activitiesService.collection().valueChanges().subscribe(activities => {
      this.activities = activities;
      this.allActivities = activities;
      this.filteredActivities = activities;
      this.updatePagedActivities(0);
    });
  }

  getUserFavorites() {
    return this.userService.collection().doc(this.user?.uid).collection('Activities').valueChanges();
  }

  addFavorite(activity: Activities) {
    return this.userService.collection().doc(this.user?.uid).collection('Activities').doc(activity.id).set(activity);
  }

  removeFavorite(activityId: string) {
    return this.userService.collection().doc(this.user?.uid).collection('Activities').doc(activityId).delete();
  }

  toggleFavorite(activity: Activities) {
    if (this.favoriteStatus[activity.id]) {
      this.removeFavorite(activity.id).then(() => {
        this.favoriteStatus[activity.id] = false;
      });
    } else {
      this.addFavorite(activity).then(() => {
        this.favoriteStatus[activity.id] = true;
      });
    }
  }

  updatePagedActivities(pageIndex: number) {
    const startIndex = pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedActivities = this.filteredActivities.slice(startIndex, endIndex); // Adjust paged packages
  }

  loadMore(event) {
    setTimeout(() => {
      const nextPageIndex = this.pagedActivities.length / this.pageSize + 1;
      
      // Check if there are more items to load
      if (nextPageIndex <= this.totalPages) {
        this.updatePagedActivities(nextPageIndex);
      } else {
        // No more items to load, disable infinite scroll or show a message
        // For example, you can disable infinite scroll
        event.target.disabled = true;
      }
  
      event.target.complete();
    }, 500);
  }

  filterActivities() {
    this.filteredActivities = this.allActivities.filter(activity => {
      const nameMatch = this.searchQuery
        ? activity.Place?.toLowerCase().includes(this.searchQuery.toLowerCase())
        : true;
      const priceMatch = (!this.minPrice || parseFloat(activity.Price) >= this.minPrice) &&
                         (!this.maxPrice || parseFloat(activity.Price) <= this.maxPrice);
     const typeMatch = !this.typeFilter || activity.Type === this.typeFilter;
     const locationMatch = !this.locationFilter || (activity.City && activity.City.toLowerCase().includes(this.locationFilter.toLowerCase()));

     return nameMatch && priceMatch && typeMatch && locationMatch;
    });

    this.updatePagedActivities(0); // Reapply pagination
  }

  async presentFilterPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: FilterActivitiesComponent,
      event: ev,
      translucent: true,
    });

    popover.onDidDismiss().then(data => {
      if (data && data.data) {
        const filterOptions = data.data;
        // Apply filtering logic with filterOptions
        this.minPrice = filterOptions.minPrice;
        this.maxPrice = filterOptions.maxPrice;
        this.typeFilter = filterOptions.typeFilter;
        this.locationFilter = filterOptions.locationFilter;
        this.filterActivities();
      }
    });

    await popover.present();
  }

  sortActivities() {
    if (!this.selectedSortOption) return;
      this.filteredActivities.sort((a, b) => {
        let comparison = 0;
    
        function parsePrice(price: string): number {
          // Convert 'NA' to a high value to treat it as the highest price or adjust accordingly
          if (price === 'NA') return 0;
          return parseFloat(price);
        }
    
        const priceA = parsePrice(a.Price);
        const priceB = parsePrice(b.Price);
    
      switch (this.selectedSortOption) {
        case 'price-low-high':
        comparison = priceA - priceB;
        break;
      case 'price-high-low':
        comparison = priceB - priceA;
        break;
        case 'name-a-z':
          comparison = a.Place.localeCompare(b.Place);
          break;
        case 'name-z-a':
          comparison = b.Place.localeCompare(a.Place);
          break;
      }
      return comparison;
    });

    this.updatePagedActivities(0); // Reapply pagination
  }
}
