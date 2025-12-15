import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { searchService } from '../../services/search';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './search.html',
  styleUrl: './search.css',
})
export class Search {
  searchForm: FormGroup;
  message : string = '';
  flights: any[] = [];
  constructor(private form: FormBuilder,private searchService: searchService,private cdr: ChangeDetectorRef) {
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
        this.cdr.detectChanges(); 
        this.message = '';
      },
      error: err => {
        console.log('Error object:', err);
        if(err.status==404){
          this.message="Not Found";
        }
        if(err.status==400){
          this.message=err.error.error;
        }
        this.flights=[];
        this.cdr.detectChanges(); 
      }
    });
}
}
