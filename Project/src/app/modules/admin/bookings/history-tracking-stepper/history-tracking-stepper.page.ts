import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Review } from 'src/app/shared/models/review.interface';
import { User } from 'src/app/shared/models/user.interface';
import { ReviewService } from '../tracking-trip-stepper/reviews.service';
import { Packages, Plan } from 'src/app/shared/models/packages.interface';
import { GmapserviceService } from '../services/gmapservice.service';
declare var google: any;
@Component({
  selector: 'app-history-tracking-stepper',
  templateUrl: './history-tracking-stepper.page.html',
  styleUrls: ['./history-tracking-stepper.page.scss'],
})
export class HistoryTrackingStepperPage implements OnInit, AfterViewInit {
  dayForm: FormGroup;
  rating: number = 0;
  stars: boolean[] = Array(5).fill(false);
  review: Review;
  checkedDescriptions: string[] = [];
  package:Packages;
  tripPlan: Plan[] = [];
  map: any;
  marker: any;
  mapListener: any;
  markerListener: any;
  intersectionObserver: any;
  markers: any[][] = []; // Array to hold markers for each plan day
  currentStepIndex: number = 0; // Initialize the index
  googleMaps: any;
  
  @ViewChild('map', { static: false }) mapElementRef: ElementRef;

  constructor(
    private _formBuilder: FormBuilder, 
    private route: ActivatedRoute,
    private reviewService:ReviewService,
    private gmaps: GmapserviceService,
    private renderer: Renderer2,) {}

    ngAfterViewInit(): void {
      this.loadMap();
    }
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

  
  async loadMap() {
    try {
      const googleMaps: any = await this.gmaps.loadGoogleMaps();
      this.googleMaps = googleMaps;
      if (this.mapElementRef && this.mapElementRef.nativeElement) {
        const mapEl = this.mapElementRef.nativeElement;
        const cityLocation = new googleMaps.LatLng(this.package.city.latitude, this.package.city.longitude);
        this.map = new googleMaps.Map(mapEl, {
          center: cityLocation,
          zoom: 12,
          mapId: '2403e3d6b80a26dc',
        });
        this.renderer.addClass(mapEl, 'visible');
        this.addMarker(cityLocation, 'City Center'); // Add marker for the city center

        // Add markers for each location in the plan
        this.addPlanMarkers();
      } else {
        console.error('Map element reference is not defined');
      }
    } catch (e) {
      console.log('google maps error', e);
    }
  }

 
  async addPlanMarkers() {
    this.markers = [];
    for (let day of this.package.plan) {
      let dayMarkers = [];
      for (let todo of day.todo) {
        if (typeof todo.latitude === 'number' && typeof todo.longitude === 'number') {
          const locationLatLng = new google.maps.LatLng(todo.latitude, todo.longitude);
          const marker = await this.addMarker(locationLatLng, todo.description);
          dayMarkers.push(marker);
          console.log(`Marker created for ${todo.description} at [${todo.latitude}, ${todo.longitude}]`);
        } else {
          console.error('Invalid coordinates:', todo);
        }
      }
      this.markers.push(dayMarkers);
    }
    this.updateMarkersVisibility(0); // Initially display markers for the first day
  }
  
  async addMarker(location: any, title: string) {
    try {
      const marker = new google.maps.Marker({
        map: this.map,
        position: location,
        title: title,
        visible: false // Markers are initially not visible
      });
      return marker;
    } catch (e) {
      console.error('Error adding marker:', e);
    }
  }

  updateMarkersVisibility(activeIndex: number) {
    this.markers.forEach((dayMarkers, index) => {
      dayMarkers.forEach(marker => {
        marker.setVisible(index === activeIndex);
        console.log(`Marker for ${marker.getTitle()} is now ${index === activeIndex ? 'visible' : 'hidden'}.`);
      });
    });
  }
  
  stepChanged(event: any) {
    this.currentStepIndex = event.selectedIndex;
    this.updateMarkersVisibility(event.selectedIndex);
    console.log(`Stepping to index ${event.selectedIndex}`);
  }

}