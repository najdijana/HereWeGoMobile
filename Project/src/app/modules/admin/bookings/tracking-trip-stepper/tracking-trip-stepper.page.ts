import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Packages, Plan } from 'src/app/shared/models/packages.interface';
import { GmapserviceService } from '../services/gmapservice.service';
declare var google: any;

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
  googleMaps: any;
  center = {
    lat: 33.888630,
    lng: 35.495480,
  };
  map: any;
  marker: any;
  mapListener: any;
  markerListener: any;
  intersectionObserver: any;
  markers: any[][] = []; // Array to hold markers for each plan day
  currentStepIndex: number = 0; // Initialize the index
  
  @ViewChild('map', { static: false }) mapElementRef: ElementRef;

  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
    private route:ActivatedRoute, 
    private gmaps: GmapserviceService,
  private renderer: Renderer2) {
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

  ngAfterViewInit(){
    this.loadMap();
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
