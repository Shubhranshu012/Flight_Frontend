import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { searchService } from '../../services/search';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-search',
  imports: [CommonModule, ReactiveFormsModule,RouterModule], 
  templateUrl: './search.html',
  styleUrl: './search.css',
})
export class Search {
  searchForm: FormGroup;
  message: string = '';
  flights: any[] = [];
  minDate: any = new Date().toISOString().split('T')[0];
  constructor(private router: Router,private form: FormBuilder, private searchService: searchService, private cdr: ChangeDetectorRef) {
    this.searchForm = this.form.group({
      fromPlace: ['', Validators.required],
      toPlace: ['', Validators.required],
      journeyDate: ['', Validators.required],
      tripType: ['one_way', Validators.required],
      returnDate: ['']
    });
  }

  onSubmit() {
    if (this.searchForm.invalid) {
      this.searchForm.markAllAsTouched();
      return;
    }
    this.searchService.searchFlights(this.searchForm.value)
      .subscribe({
        next: res => {
          this.flights = res.onwardFlights;
          this.message = '';
          this.cdr.detectChanges();
        },
        error: err => {
          console.log('Error object:', err);
          if (err.status == 404) {
            this.message = "Not Found";
          }
          if (err.status == 400) {
            this.message = err.error.error;
          }
          this.flights = [];
          this.cdr.detectChanges();
        }
      });
  }
  booking(id: string) {
    console.log(id);
    this.router.navigate([`/booking/${id}`]);
  }
}
