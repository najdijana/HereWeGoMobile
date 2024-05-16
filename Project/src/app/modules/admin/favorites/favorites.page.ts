import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ItemReorderEventDetail } from '@ionic/angular';
import { BehaviorSubject, Observable, Subscription, combineLatest, map } from 'rxjs';
import { TopDestinationService } from '../top-destinations/destinations/service/topdestination.service';
import { ActivitiesService } from '../activities/services/activities.services';
import { RestaurantsService } from '../restaurants/restaurants.service';
import { TransportationService } from '../transportations/transportation.service';
import { AccommodationService } from '../accomodations/accomodations.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit,OnDestroy {
  favorites$: Observable<any[]>;
  searchQuery$: BehaviorSubject<string> = new BehaviorSubject('');
  filteredFavorites$: Observable<any[]>;
  private subscriptions: Subscription = new Subscription();


  constructor(private firestore:AngularFirestore,
              private topDestinationService:TopDestinationService,
              private activitiesService:ActivitiesService,
              private restaurantsService:RestaurantsService,
              private transportationService:TransportationService,
              private accomodationService:AccommodationService) { }


           

  ngOnInit() {
    this.favorites$ = this.getAllFavorites();
    this.filteredFavorites$ = combineLatest([this.favorites$, this.searchQuery$]).pipe(
      map(([favorites, query]) => {
        return favorites.filter(item => 
          item.Name.toLowerCase().includes(query) ||
          item.City.toLowerCase().includes(query)
        );
      })
    ); }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  private fetchFavorites(collection: string): Observable<any[]> {
    return this.firestore.collection(collection, ref => ref.where('isFavorite', '==', true))
      .snapshotChanges()
      .pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as object;
          const id = a.payload.doc.id;
          return { id, ...data, type: collection }; 
        }))
      );
  }

  filterFavorites(event: any) {
    const query = event.target.value.toLowerCase();
    this.searchQuery$.next(query);
  }
  

  // Fetch all favorites across collections
  getAllFavorites(): Observable<any[]> {
    const collections = ['Accommodation', 'Activities', 'Restaurants', 'Transportation', 'TopDestinations'];
    const observables = collections.map(collection => this.fetchFavorites(collection));
    
    return combineLatest(observables).pipe(
      map(arrays => arrays.reduce((acc, cur) => [...acc, ...cur], []))
    );
  }

  toggleFavorite(item: any) {

    console.log("Selected item:", item);

    switch (item.type) {
      case 'Accomodation':
        this.accomodationService.doc(item.id).update({ isFavorite: false });
          break;
      case 'Activities':
        this.activitiesService.doc(item.id).update({ isFavorite: false });
          break;
      case 'Restaurants':
        this.restaurantsService.doc(item.id).update({ isFavorite: false });
          break;
      case 'Transportation':
        this.transportationService.doc(item.id).update({ isFavorite: false });
          break;
      case 'TopDestinations':
        this.topDestinationService.doc(item.id).update({ isFavorite: false });
        break;
      default:
          break;
  }
    

    
  }

  handleReorder(ev: CustomEvent<ItemReorderEventDetail>) {
    console.log('Dragged from index', ev.detail.from, 'to', ev.detail.to);
    ev.detail.complete();
  }



}
