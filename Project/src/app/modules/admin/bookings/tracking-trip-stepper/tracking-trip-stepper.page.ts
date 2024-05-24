import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Packages, Plan } from 'src/app/shared/models/packages.interface';
import { Review } from 'src/app/shared/models/review.interface';
import { User } from 'src/app/shared/models/user.interface';
import { ReviewService } from './reviews.service';
import { debounceTime, tap } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';

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
  user: User;
  review: Review;
  isChecked: boolean = false;
  selectedDesc: string;
  checkedDescriptions: string[] = [];

  constructor(private _formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute, private reviewService: ReviewService) {}

  ngOnInit() {
    this.package = this.route.snapshot.data.package as Packages;
    this.user = this.reviewService.authService.firestoreUser as User;
    this.tripPlan = this.package.plan || [];
    console.log("plan",this.tripPlan)
    this.dayForm = this._formBuilder.group({
      id: [this.reviewService.createID()],
      rate: ['', Validators.required],
      review: ['', Validators.required],
      ratedAt: [new Date()],
      user: [this.user],
      description: [[]]
    });

    this.listenOnValueChanges();
  }

  rate(rating: number) {
    this.rating = rating;
    this.dayForm.patchValue({ rate: this.rating });
  }

  completeTrip() {
    this.dayForm.patchValue({ description: this.checkedDescriptions });
    console.log("form", this.dayForm.value);
    const review = this.dayForm.value as Review;
    console.log("review", review);
    this.reviewService.setParentPathPackage(this.package.id);
    this.reviewService.collection().doc(review.id).set(review,{merge: true}).then(()=>{
      this.reviewService.setParentPathUser(this.user.uid);
      const { user, ...reviewWithoutUser } = review;
      this.reviewService.collection().doc(review.id).set(reviewWithoutUser,{merge: true})
    }).finally(()=>{
      this.router.navigate(['/'])
    })
  }

  updateForm(event, todo: string) {
    if (event.checked) {
      this.checkedDescriptions.push(todo);
    } else {
      const index = this.checkedDescriptions.indexOf(todo);
      if (index > -1) {
        this.checkedDescriptions.splice(index, 1);
      }
    }
    console.log("Checked Descriptions:", this.checkedDescriptions);
  }

  listenOnValueChanges() {
    this.dayForm.valueChanges
      .pipe(
        debounceTime(300),
        tap((value) => {
          const review = this.dayForm.value as Review;
          console.log("updated form", value, "review", review);
        })
      ).subscribe();
  }
}
