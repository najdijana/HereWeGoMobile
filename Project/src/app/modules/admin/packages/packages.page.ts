import { Component, OnInit } from '@angular/core';
import { Packages } from 'src/app/shared/models/packages.interface';
import { PopoverController } from '@ionic/angular';
import { FilterPackagesComponent } from './filter-packages/filter-packages.component';
import { PackageService } from './Services/packages.service';
import { Review } from 'src/app/shared/models/review.interface';

@Component({
  selector: 'app-packages',
  templateUrl: './packages.page.html',
  styleUrls: ['./packages.page.scss'],
})
export class PackagesPage implements OnInit {

  packages: Packages[];
  pagedPackages: Packages[] = [];
  filteredPackages: Packages[] = []; // Filtered list
  allPackages: Packages[] = []; // Original list
  searchQuery: string = ''; // Search variable
  minPrice?: number; // Optional min price
  maxPrice?: number; // Optional max price
  pageSize: number = 6;
  daysFilter: number;
  personsFilter: number;
  showFiller: boolean = false; // Default value, can be true or false

  selectedSortOption: string = 'sort by'; // Default sort option
  totalPages: number;

  constructor(private packageService: PackageService, private popoverController: PopoverController) {}

  ngOnInit() {
    this.getPackages();
  }

  add(packg:Packages){
    //this.guiderService.collection().doc("QDl5K7sVdsfxRwQpmJqVJarppmj1").collection('packages').doc(packg.id).set(packg, {merge: true});
  }

  getPackages() {
    this.packageService.collection().valueChanges().subscribe(async packages => {
      this.packages = packages;
      this.allPackages = packages;
      this.filteredPackages = packages;
      for (const pkg of this.packages) {
        await this.getReviewsForPackage(pkg);
      }
      this.updatePagedPackages(0);
    });
  }

  async getReviewsForPackage(pkg: Packages) {
    // this.reviewService.setParentPathPackage(pkg.id);
    const reviewsSnapshot = await this.packageService.collection().doc(pkg.id).collection('review').get().toPromise();
    const reviews = reviewsSnapshot.docs.map(doc => doc.data() as Review);

    pkg.nbreviews = reviews.length;
    if (reviews.length > 0) {
      const totalRating = reviews.reduce((sum, review) => sum + (review.rate || 0), 0);
      pkg.review = totalRating / reviews.length;
    } else {
      pkg.review = 0;
    }
  }

  // Other methods remain the same

  updatePagedPackages(pageIndex: number) {
    const startIndex = pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedPackages = this.filteredPackages.slice(startIndex, endIndex); // Adjust paged packages
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


  filterPackages() {
    this.filteredPackages = this.allPackages.filter(pkg => {
      const nameMatch = this.searchQuery
        ? pkg.packageName?.toLowerCase().includes(this.searchQuery.toLowerCase())
        : true;
      
        const isPriceFilterActive = this.minPrice !== undefined && this.maxPrice !== undefined;
        const daysFilterApplied = this.daysFilter !== null && this.daysFilter !== undefined && this.daysFilter !== 0;
        const personsFilterApplied = this.personsFilter !== null && this.personsFilter !== undefined && this.personsFilter !== 0;
    
        let priceMatch = true;
        if (this.minPrice !== undefined && this.maxPrice !== undefined) {
          priceMatch = pkg.budget >= (this.minPrice ?? 0) && pkg.budget <= (this.maxPrice ?? Infinity);
        } else if (this.minPrice !== undefined) {
          priceMatch = pkg.budget >= (this.minPrice ?? 0); // Only min specified
        } else if (this.maxPrice !== undefined) {
          priceMatch = pkg.budget <= (this.maxPrice ?? Infinity); // Only max specified
        }
  
      let daysMatch = true;
      if (daysFilterApplied) {
        daysMatch = pkg.days === this.daysFilter;
      }
  
      let personsMatch = true;
      if (personsFilterApplied) {
        personsMatch = pkg.persons === this.personsFilter;
      }
  
      return nameMatch && priceMatch && daysMatch && personsMatch;
     });


    this.updatePagedPackages(0); // Reapply pagination
  }

  async presentFilterPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: FilterPackagesComponent,
      event: ev,
      translucent: true,
    });

    popover.onDidDismiss().then(data => {
      if (data && data.data) {
        const filterOptions = data.data;
        // Apply filtering logic with filterOptions
        this.minPrice = filterOptions.minPrice;
        this.maxPrice = filterOptions.maxPrice;
        this.daysFilter = filterOptions.daysFilter;
        this.personsFilter = filterOptions.personsFilter;
        this.filterPackages();
      }
    });

    await popover.present();
  }



  sortPackages() {
    switch (this.selectedSortOption) {
      case 'price-low-high':
        this.filteredPackages.sort((a, b) => a.budget - b.budget);
        break;
      case 'price-high-low':
        this.filteredPackages.sort((a, b) => b.budget - a.budget);
        break;
        case 'name-a-z':
          this.filteredPackages.sort((a, b) => {
            const nameA = a.packageName?.toLowerCase();
            const nameB = b.packageName?.toLowerCase();
            if (!nameA || !nameB) {
              console.error('Invalid package name found:', a.packageName, b.packageName);
              return 0; // Handle invalid data by leaving the order unchanged
            }
            return nameA.localeCompare(nameB);
          });
          break;
        case 'name-z-a':
          this.filteredPackages.sort((a, b) => {
            const nameA = b.packageName?.charAt(0).toLowerCase();
            const nameB = a.packageName?.charAt(0).toLowerCase();
            return nameA.localeCompare(nameB);
          });
          break;
          case 'reviews-low-high':
            this.filteredPackages.sort((a, b) => a.review - b.review);
            break;
          case 'reviews-high-low':
            this.filteredPackages.sort((a, b) => b.review - a.review);
            break;
    }

    this.updatePagedPackages(0); // Reapply pagination
    
  }
}