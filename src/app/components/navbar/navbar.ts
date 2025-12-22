import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  constructor(private route:Router){}
  logout(){
    localStorage.clear();
    this.route.navigate(['/'])
  }
  isUser(): boolean {
    if(localStorage.getItem('role') == 'USER'){
      return true;
    }
    return false;
  }
  isLoggedIn(): boolean {
    if(localStorage.getItem('token') != null){
      return true;
    }
    return false;
  }
  
  isAdmin(): boolean {
    if(localStorage.getItem('role') == 'ADMIN'){
      return true;
    }
    return false;
  }
} 
