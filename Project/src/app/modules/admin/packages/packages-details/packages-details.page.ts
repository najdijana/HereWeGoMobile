import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Packages } from 'src/app/shared/models/packages.interface';

@Component({
  selector: 'app-packages-details',
  templateUrl: './packages-details.page.html',
  styleUrls: ['./packages-details.page.scss'],
})
export class PackagesDetailsPage implements OnInit {
  package: Packages;
  isPlanOpen: boolean[];


  constructor(private route: ActivatedRoute, private router: Router) { }
  ngOnInit(): void {
    this.package = this.route.snapshot.data.package as Packages;
    // Initialize isPlanOpen array once the package data is available
    this.isPlanOpen = new Array(this.package.plan.length).fill(false);
    console.log('test --> package = ', this.package);
  }

  booking() {
    // Add your booking logic here
  }

 
  addReview() {
    // Add logic to handle adding a review
  }

  togglePlan(index: number) {
    this.isPlanOpen[index] = !this.isPlanOpen[index];
  }

}