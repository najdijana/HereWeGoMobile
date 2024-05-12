import { Component, OnInit } from '@angular/core';
import { Transportation } from 'src/app/shared/models/transportation.interface';
import { TransportationService } from './transportation.service';

@Component({
  selector: 'app-transportations',
  templateUrl: './transportations.page.html',
  styleUrls: ['./transportations.page.scss'],
})
export class TransportationsPage implements OnInit {
  transportations: Transportation[];
  filteredTransportations: Transportation[] = [];
  allTransportations: Transportation[] = [];
  searchQuery: string = '';
  selectedSortOption: string = 'sort by';
  pagedPackages: Transportation[] = [];
  pageSize: number = 6;
  totalPages: number;
  constructor(private transportationService: TransportationService) {}

  ngOnInit() {
    this.transportationService.collection().valueChanges().subscribe(data => {
      this.transportations = data;
      this.allTransportations = data;
      this.filteredTransportations = data;
      this.updatePagedPackages(0);
    });
  }

   // Other methods remain the same

   updatePagedPackages(pageIndex: number) {
    const startIndex = pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedPackages = this.filteredTransportations.slice(startIndex, endIndex); // Adjust paged packages
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
  filterTransportations() {
    this.filteredTransportations = this.allTransportations.filter(transport => {
      const query = this.searchQuery.toLowerCase();
      return transport.Name.toLowerCase().includes(query);
    });
    this.updatePagedPackages(0); // Reapply pagination

  }

  sortTransportations() {
    switch (this.selectedSortOption) {
      case 'name-a-z':
        this.filteredTransportations.sort((a, b) => a.Name.toLowerCase().localeCompare(b.Name.toLowerCase()));
        break;
      case 'name-z-a':
        this.filteredTransportations.sort((a, b) => b.Name.toLowerCase().localeCompare(a.Name.toLowerCase()));
        break;
      case 'public-first':
        this.filteredTransportations.sort((a, b) => b.Public === a.Public ? 0 : b.Public ? 1 : -1);
        break;
      case 'private-first':
        this.filteredTransportations.sort((a, b) => a.Public === b.Public ? 0 : a.Public ? 1 : -1);
        break;
    }
    this.updatePagedPackages(0); // Reapply pagination
  }
}

