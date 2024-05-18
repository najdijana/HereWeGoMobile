import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Packages } from 'src/app/shared/models/packages.interface';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {
  package: Packages;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.package = this.route.snapshot.data.package as Packages;
    console.log("package :",this.package)
  }

}
