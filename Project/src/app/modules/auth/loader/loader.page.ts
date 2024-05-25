import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.page.html',
  styleUrls: ['./loader.page.scss'],
})
export class LoaderPage implements OnInit {

  constructor(private fireauth: AngularFireAuth, private router: Router) {}

  ngOnInit(): void {
    this.fireauth.authState.subscribe(user => {
      if (user) {
        this.router.navigate(['home']); // Adjust as necessary for default folder
      } else {
        this.router.navigate(['sign-in']);
      }
    });
  }

}
