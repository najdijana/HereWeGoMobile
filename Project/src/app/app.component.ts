import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  public appPages = [
    { title: 'home', url: '/loader', icon: 'trash' },
    { title: 'All Destinations', url: '/topdestinations-leb', icon: 'mail' },
    { title: 'Destinations', url: '/top-destinations', icon: 'paper-plane' },
    { title: 'Packages', url: '/packages', icon: 'heart' },
    { title: 'favorites', url: '/favorites', icon: 'archive' },
    { title: 'bookings', url: '/bookings', icon: 'warning' },
    { title: 'user Profile', url: '/user-profile/:id', icon: 'warning' },

  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor(public auth:AuthService) {}
  ngOnInit(): void {
      // this.auth.logout()
  }
}
