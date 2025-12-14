import { Component } from '@angular/core';
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

  constructor(private form: FormBuilder,private searchService: searchService) {
    this.searchForm = this.form.group({
      from: ['', Validators.required],
      to: ['', Validators.required],
      journeyDate: ['', Validators.required],
      tripType: ['One_way', Validators.required],
      returnDate: ['']
    });
  }

  onSubmit() {
    if (this.searchForm.invalid) return;
    console.log(this.searchForm.value);
    this.searchService.searchFlights(this.searchForm.value)
    .subscribe({
      next: res => console.log('Search result:', res),
      error: err => console.error(err)
    });

  }
}
