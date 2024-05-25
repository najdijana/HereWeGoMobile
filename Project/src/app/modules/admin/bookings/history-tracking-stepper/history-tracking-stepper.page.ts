import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Review } from 'src/app/shared/models/review.interface';
import { User } from 'src/app/shared/models/user.interface';
import { ReviewService } from '../tracking-trip-stepper/reviews.service';
import { Packages, Plan } from 'src/app/shared/models/packages.interface';

@Component({
  selector: 'app-history-tracking-stepper',
  templateUrl: './history-tracking-stepper.page.html',
  styleUrls: ['./history-tracking-stepper.page.scss'],
})
export class HistoryTrackingStepperPage implements OnInit {
  dayForm: FormGroup;
  rating: number = 0;
  stars: boolean[] = Array(5).fill(false);
  review: Review;
  checkedDescriptions: string[] = [];
  package:Packages;
  tripPlan: Plan[] = [];

  constructor(private _formBuilder: FormBuilder, private route: ActivatedRoute,private reviewService:ReviewService) {}

  ngOnInit() {
    this.package=this.route.snapshot.data.package as Packages;
    this.tripPlan = this.package.plan || [];
    const rewiewId= this.route.snapshot.paramMap.get('id');
    console.log("rewiewId",rewiewId);
    this.dayForm = this._formBuilder.group({
      id: [''],
      rate: [{ value: '', disabled: true }],
      review: [{ value: '', disabled: true }],
      ratedAt: [''],
      description: [[]]
    });
    this.reviewService.setParentPathPackage(this.package.id);
    this.reviewService.collection().doc(rewiewId).valueChanges().subscribe((review)=>{
      console.log("review",review);
      if (review) {
        this.review = review;
        this.dayForm.patchValue(review);
        this.checkedDescriptions = review.description || [];
        this.rating = review.rate || 0;
      }
      else{
        this.review = null;
        this.dayForm.patchValue(review);
        this.checkedDescriptions = [];
        this.rating = 0;
      }
    });
    //const review = this.route.snapshot.data.review as Review;
  }

  isChecked(todo: string): boolean {
    return this.checkedDescriptions.includes(todo);
  }
}