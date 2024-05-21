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
  // center = {
  //   lat: 33.888630,
  //   lng: 35.495480,
  // };
  map: any;
  marker: any;
  mapListener: any;
  markerListener: any;
  intersectionObserver: any;

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
    for (let day of this.package.plan) {
      for (let todo of day.todo) {
        const locationLatLng = new google.maps.LatLng(todo.latitude, todo.longitude);
        this.addMarker(locationLatLng, todo.description);
      }
    }
  }

  async addMarker(location: any, title: string) {
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
    const marker = new AdvancedMarkerElement({
      map: this.map,
      position: location,
      title: title,
      gmpDraggable: true,
    });
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
