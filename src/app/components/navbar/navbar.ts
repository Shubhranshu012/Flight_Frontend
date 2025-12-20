import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  logout(){
    localStorage.clear();
  }
  isLoggedIn(): boolean {
    if(localStorage.getItem('token') != null){
      return true;
    }
    return false;
  }
} 
