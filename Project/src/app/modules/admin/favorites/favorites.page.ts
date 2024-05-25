import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ItemReorderEventDetail } from '@ionic/angular';
import { BehaviorSubject, Observable, Subscription, combineLatest, map } from 'rxjs';
import { TopDestinationService } from '../top-destinations/destinations/service/topdestination.service';
import { ActivitiesService } from '../activities/services/activities.services';
import { RestaurantsService } from '../restaurants/restaurants.service';
import { TransportationService } from '../transportations/transportation.service';
import { AccommodationService } from '../accomodations/accomodations.service';
import { User } from 'src/app/shared/models/user.interface';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';

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
  user: User;


  constructor(private firestore:AngularFirestore,
              private userService:UserService,
              private authServie:AuthService,
              private topDestinationService:TopDestinationService,
              private activitiesService:ActivitiesService,
              private restaurantsService:RestaurantsService,
              private transportationService:TransportationService,
              private accomodationService:AccommodationService) { }

  ngOnInit() {
    this.user=this.authServie.authUser;
    console.log("user",this.user);
    this.favorites$ = this.getAllFavorites();
    this.filteredFavorites$ = combineLatest([this.favorites$, this.searchQuery$]).pipe(
      map(([favorites, query]) => {
        return favorites.filter(item => 
          item?.Name?.toLowerCase().includes(query) ||
          item?.City?.toLowerCase().includes(query)
        );
      })
    ); }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  private fetchFavorites(collection: string): Observable<any[]> {
    return this.firestore.collection(`users/${this.user.uid}/${collection}`)
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
      case 'Accommodation':
        this.userService.collection().doc(this.user?.uid).collection('Accommodation').doc(item.id).delete();
        break;
      case 'Activities':
        this.userService.collection().doc(this.user?.uid).collection('Activities').doc(item.id).delete();
        break;
      case 'Restaurants':
        this.userService.collection().doc(this.user?.uid).collection('Restaurants').doc(item.id).delete();
        break;
      case 'Transportation':
        this.userService.collection().doc(this.user?.uid).collection('Transportation').doc(item.id).delete();
        break;
      case 'TopDestinations':
        this.userService.collection().doc(this.user?.uid).collection('TopDestinations').doc(item.id).delete();
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
