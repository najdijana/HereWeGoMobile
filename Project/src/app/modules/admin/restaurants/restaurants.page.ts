import { Component, OnInit } from '@angular/core';
import { Restaurants } from 'src/app/shared/models/restaurants.interface';
import { RestaurantsService } from './restaurants.service';
import { PopoverController } from '@ionic/angular';
import { FilterRestaurantsComponent } from './filter-restaurants/filter-restaurants.component';
import { User } from 'src/app/shared/models/user.interface';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.page.html',
  styleUrls: ['./restaurants.page.scss'],
})
export class RestaurantsPage  implements OnInit {
  restaurants: Restaurants[];
  filteredRestaurants: Restaurants[] = [];
  allRestaurants: Restaurants[] = [];
  searchQuery: string = '';
  selectedSortOption: string = 'sort by';
  pagedPackages: Restaurants[] = [];
  pageSize: number = 6;
  totalPages: number;
  favoriteStatus: {[key: string]: boolean} = {};
  user:User;
  constructor(private restaurantsService: RestaurantsService, private popoverController: PopoverController, private userService: UserService,private authService:AuthService) {}

  ngOnInit() {
    this.user = this.authService.authUser;
    console.log("user",this.user)
    this.restaurantsService.collection(ref => ref.where('published', '==', true))
    .valueChanges().subscribe(data => {
      this.restaurants = data;
      this.allRestaurants = data;
      this.filteredRestaurants = data;
      data.forEach((destination: Restaurants) => {
        this.favoriteStatus[destination.id] = destination.isFavorite || false;
      });
      this.updatePagedPackages(0);
    });
    this.getUserFavorites().subscribe(favorites => {
      favorites.forEach(favorite => {
        this.favoriteStatus[favorite.id] = true;
      });
    });
  }

  
  getUserFavorites() {
    return this.userService.collection().doc(this.user?.uid).collection('Restaurants').valueChanges();
  }

  addFavorite(activity: Restaurants) {
    return this.userService.collection().doc(this.user?.uid).collection('Restaurants').doc(activity.id).set(activity);
  }

  removeFavorite(activityId: string) {
    return this.userService.collection().doc(this.user?.uid).collection('Restaurants').doc(activityId).delete();
  }

  toggleFavorite(activity: Restaurants) {
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

   // Other methods remain the same

   updatePagedPackages(pageIndex: number) {
    const startIndex = pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedPackages = this.filteredRestaurants.slice(startIndex, endIndex); // Adjust paged packages
  }

  loadMore(event) {
    setTimeout(() => {
      const nextPageIndex = this.pagedPackages.length / this.pageSize + 1;
      
      // Check if there are more items to load
      if (nextPageIndex <= this.totalPages) {
        this.updatePagedPackages(nextPageIndex);
      } else {
        // No more items to load, disable infinite scroll or show a message
        // For example, you can disable infinite scroll
        event.target.disabled = true;
      }
      event.target.complete();
    }, 500);
  }
  filterRestaurants() {
    this.filteredRestaurants = this.allRestaurants.filter(restaurant => {
      const query = this.searchQuery.toLowerCase();
      console.log("query",query)
      console.log("query found",restaurant.Name.toLowerCase().includes(query))
      return restaurant.Name.toLowerCase().includes(query)
      //  ||
      //        restaurant.City.toLowerCase().includes(query) ||
      //        restaurant.Cuisine.some(cuisine => cuisine.toLowerCase().includes(query));
    });
    this.updatePagedPackages(0); // Reapply pagination
  }

  sortRestaurants() {
    switch (this.selectedSortOption) {
      // case 'price-low-high':
      //   // Assumes price range like "$10 - $20" and sorts by the lower bound
      //   this.filteredRestaurants.sort((a, b) => parseFloat(a.Price_range.split('-')[0].replace(/[^\d.]/g, '')) - parseFloat(b.Price_range.split('-')[0].replace(/[^\d.]/g, '')));
      //   break;
      // case 'price-high-low':
      //   this.filteredRestaurants.sort((a, b) => parseFloat(b.Price_range.split('-')[0].replace(/[^\d.]/g, '')) - parseFloat(a.Price_range.split('-')[0].replace(/[^\d.]/g, '')));
      //   break;
      case 'name-a-z':
        this.filteredRestaurants.sort((a, b) => a.Name.toLowerCase().localeCompare(b.Name.toLowerCase()));
        break;
      case 'name-z-a':
        this.filteredRestaurants.sort((a, b) => b.Name.toLowerCase().localeCompare(a.Name.toLowerCase()));
        break;
      case 'city-a-z':
        this.filteredRestaurants.sort((a, b) => a.City.toLowerCase().localeCompare(b.City.toLowerCase()));
        break;
      case 'city-z-a':
        this.filteredRestaurants.sort((a, b) => b.City.toLowerCase().localeCompare(a.City.toLowerCase()));
        break;
    }
    this.updatePagedPackages(0); // Reapply pagination
  }

  async presentFilterPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: FilterRestaurantsComponent,
      event: ev,
      translucent: true,
      });
  
    await popover.present();
  
    const { data } = await popover.onDidDismiss();
    if (data) {
      this.filter(data);  // Ensure you handle these filters appropriately in your filtering logic
    }
  }
  

  filter(filters: any) {
    this.filteredRestaurants = this.restaurants.filter(restaurant => {
      const typeMatch = filters.type ? restaurant.Type === filters.type : true;
      const mealMatch = filters.meals.length ? filters.meals.some(meal => restaurant.Meals.includes(meal)) : true;
      const cityMatch = filters.city ? restaurant.City.toLowerCase().includes(filters.city.toLowerCase()) : true;
      const cuisineMatch = filters.cuisine ? restaurant.Cuisine.some(cuisine => cuisine.toLowerCase().includes(filters.cuisine.toLowerCase())) : true;
  
      return typeMatch && mealMatch && cityMatch && cuisineMatch;
    });
  }
}