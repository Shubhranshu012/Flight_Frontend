import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-temp',
  imports: [CommonModule,FormsModule],
  templateUrl: './temp.html',
  styleUrl: './temp.css',
})
export class Temp {
  message=signal("Hello");
  name: string = '';
  button:boolean=false;
  textColor = 'red';
  count:number=0;
  change(event:any) {
    console.log(this.name);
    if(this.name==""){
      this.button=false;
    }
    else{
      this.button=true;
    }
  }
  buttonClicked(){
    console.log("clicked");
    this.count++;
  }
}
