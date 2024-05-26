import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  public appPages = [
    { title: 'Home', url: '/loader', icon: 'home' },
    { title: 'All Destinations', url: '/topdestinations-leb', icon: 'map' },
    { title: 'Destinations', url: '/top-destinations', icon: 'paper-plane' },
    { title: 'Packages', url: '/packages', icon: 'heart' },
    { title: 'Favorites', url: '/favorites', icon: 'archive' },
    { title: 'Bookings', url: '/bookings', icon: 'ticket' },
    { title: 'Chats', icon: 'chatbubble', url: '/chats' },
    { title: 'Site Detection', url: '/image-location-detector', icon: 'color-wand' },
    { title: 'Restaurants', url: '/restaurants', icon: 'restaurant' },
    { title: 'Activities', url: '/activities', icon: 'brush' },
    { title: 'Lodges', url: '/accommodations', icon: 'bed' },
    { title: 'Transportation', url: '/transportations', icon: 'car' },
    { title: 'Signout', action: () => this.logout(), icon: 'log-out', url: '/sign-in' },


  ];
  constructor(public auth:AuthService) {}
  ngOnInit(): void {
      // this.auth.logout()
  }
  
  logout(): void {
    this.auth.logout();
  }
}
