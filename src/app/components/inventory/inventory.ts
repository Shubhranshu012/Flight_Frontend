import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../services/auth';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-inventory',
  imports: [FormsModule,CommonModule,RouterModule],
  templateUrl: './inventory.html',
  styleUrl: './inventory.css',
})
export class Inventory implements OnInit{
  airlineName: string = "";
  airlineLogo: string = "https://indigo.com/logo.png";
  fromPlace: string = "";
  toPlace: string = "";
  flightNumber: string = "";
  departureTime: string = "";
  arrivalTime: string = "";
  price: number = 0;
  totalSeats: number = 0;
  availableSeats: number = 0;
  message: string = "";
  successMessage:string="";
  minDate: string = new Date().toISOString().slice(0, 16);
  constructor(private authService:Auth, private cdr: ChangeDetectorRef,private route:Router){}
  ngOnInit() {
    if (localStorage.getItem('role') !== 'ADMIN') {
      this.route.navigate(['/']);
    }
  }
  AddInventory() {
    if(this.flightNumber.trim().length<2){
      this.message="Flight Number Is required";
    }
    if (!this.fromPlace || !this.toPlace) {
      this.message = "From and To places are required";
      return;
    }
    if (this.fromPlace === this.toPlace) {
      this.message = "From and To places cannot be the same";
      return;
    }
    if (!this.departureTime || !this.arrivalTime) {
      this.message = "Departure and Arrival date & time are required";
      return;
    }

    if (this.arrivalTime <= this.departureTime) {
      this.message = "Arrival time must be after departure time";
      return;
    }
    if (this.price <= 0) {
      this.message = "Price must be greater than 0";
      return;
    }
    if (this.totalSeats <= 0) {
      this.message = "Total seats must be greater than 0";
      return;
    }
    if (this.availableSeats < 0) {
      this.message = "Available seats cannot be negative";
      return;
    }
    if (this.availableSeats > this.totalSeats) {
      this.message = "Available seats cannot exceed total seats";
      return;
    }
    this.authService.Add({"airlineName": this.airlineName,"airlineLogo": this.airlineLogo,"fromPlace":this.fromPlace,"toPlace": this.toPlace,"flightNumber": this.flightNumber,"departureTime":this.departureTime,"arrivalTime": this.arrivalTime,"price": this.price,"totalSeats": this.totalSeats,"availableSeats":this.availableSeats}).subscribe({
      next: (responce) => {
        console.log('Success', responce);
        this.successMessage="Added Inventory";
        this.cdr.detectChanges();
      },
      error: (responce) => {
        console.error('Error', responce);
        this.successMessage="";
        this.message=responce.error.inventoryRequestDto || responce.error.error;
        this.cdr.detectChanges();
      }
    });
  }
}
