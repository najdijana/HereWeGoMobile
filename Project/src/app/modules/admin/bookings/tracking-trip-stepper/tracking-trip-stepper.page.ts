import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Packages, Plan } from 'src/app/shared/models/packages.interface';

@Component({
  selector: 'app-tracking-trip-stepper',
  templateUrl: './tracking-trip-stepper.page.html',
  styleUrls: ['./tracking-trip-stepper.page.scss'],
})
export class TrackingTripStepperPage implements OnInit {
  dayForm: FormGroup;
  ratingForm: FormGroup;
  rating: number = 0;
  stars: boolean[] = Array(5).fill(false);
  tripPlan: Plan[] = [];
  package: Packages;

  constructor(private _formBuilder: FormBuilder, private router: Router,private route:ActivatedRoute) {
    this.dayForm = this._formBuilder.group({
      isChecked: [false, Validators.requiredTrue]
    });
    this.ratingForm = this._formBuilder.group({
      rating: ['', Validators.required],
      review: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.package = this.route.snapshot.data.package as Packages;
    console.log("pkg", this.package);
    this.tripPlan = this.package.plan || [];
  }

  rate(rating: number) {
    console.log("rating",rating,this.ratingForm.value)
    this.rating = rating;
    this.ratingForm.patchValue({ rating: this.rating });
  }

  completeTrip() {
    // Add your logic to handle the review submission here if needed
    // After handling, navigate to the home page
    //this.router.navigate(['/home']);
  }
}
