import { Component, OnInit } from '@angular/core';
import { Packages } from 'src/app/shared/models/packages.interface';

@Component({
  selector: 'app-packages-details',
  templateUrl: './packages-details.page.html',
  styleUrls: ['./packages-details.page.scss'],
})
export class PackagesDetailsPage implements OnInit {
  package: Packages;
  isPlanOpen: boolean[];


  constructor() {
    // Initialize package data, you can fetch this data from a service or wherever it's coming from
    this.package = {
      id: '1',
      place: 'Beirut',
      description: 'Day by the beach, this is a dummy data for description in order to see how it is gonna look on the frontend',
      days: 7,
      review: 4,
      persons: 2,
      packageName: 'Beirut Summer Day ',
      image: '../../../assets/img/mald1.jpeg',
      budget: 1000,
      nbreviews: 50,
      gallery: ['../../../assets/img/mald2.jpeg', '../../../assets/img/mald4.jpeg', '../../../assets/img/mald3.jpeg'],
      plan: [
        { day: 1, title: 'Day 1', todo: ['Activity 1', 'Activity 2'] },
        { day: 2, title: 'Day 2', todo: ['Activity 1', 'Activity 2'] },
      ],
     
      inclusions: [
        { title: 'Inclusion 1', details: 'Details 1' },
        { title: 'Inclusion 2', details: 'Details 2' },
      ],
      exclusions: [
        { title: 'Exclusion 1', details: 'Details 1' },
        { title: 'Exclusion 2', details: 'Details 2' },
      ],
    };

    this.isPlanOpen = new Array(this.package.plan.length).fill(false);
  
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  booking() {
    // Add your booking logic here
  }

  prevStep() {
    // Add logic to navigate to previous step in trip plan
  }

  nextStep() {
    // Add logic to navigate to next step in trip plan
  }

  addReview() {
    // Add logic to handle adding a review
  }

  togglePlan(index: number) {
    this.isPlanOpen[index] = !this.isPlanOpen[index];
  }

}