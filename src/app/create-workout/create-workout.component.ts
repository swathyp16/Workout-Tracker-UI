import { Component, OnInit } from '@angular/core';
import { IAddWorkout } from './create-workout';
import { AddWorkoutService } from './create-workout.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-workout',
  templateUrl: './create-workout.component.html',
  styleUrls: ['./create-workout.component.css'],
  providers: [AddWorkoutService]
})
export class CreateWorkoutComponent implements OnInit {
  workout = new IAddWorkout();   

 addWorkout: IAddWorkout[];
  constructor(private _addWorkoutService: AddWorkoutService) {  
    
    console.log("hurrayyy !!!!!!!!!!!" + JSON.stringify(this.addWorkout));
   }
  
  ngOnInit() {
    //this._addWorkoutService.addWorkout().subscribe(addedData => this.addWorkout = addedData);
    console.log("yeahhhh !!!!!!!!!!!");
   
  }
  
  //onSubmit() {
   // this._addWorkoutService.addWorkout().subscribe(addedData => this.addWorkout = addedData);
    
    //this._addWorkoutService.addWorkout().subscribe(addedData => this.addWorkout = addedData);
  //}

  onAddWorkoutFormSubmit(addForm : NgForm): void{
    console.log("addWorkoutForm : " + JSON.stringify(addForm.value));
    this._addWorkoutService.addWorkout(addForm).subscribe(addedData => this.addWorkout = addedData);
  }

}
