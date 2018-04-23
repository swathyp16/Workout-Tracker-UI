import { Component, OnInit } from '@angular/core';
import { IAddWorkout } from './create-workout';
import { AddWorkoutService } from './create-workout.service';

@Component({
  selector: 'app-create-workout',
  templateUrl: './create-workout.component.html',
  styleUrls: ['./create-workout.component.css'],
  providers: [AddWorkoutService]
})
export class CreateWorkoutComponent implements OnInit {
  workout = new IAddWorkout();   

 addWorkout: IAddWorkout;
  constructor(private _addWorkoutService: AddWorkoutService) {  
    
    console.log("hurrayyy !!!!!!!!!!!" + JSON.stringify(this.addWorkout));
   }
  
  ngOnInit() {
    //this._addWorkoutService.addWorkout().subscribe(addedData => this.addWorkout = addedData);
    console.log("yeahhhh !!!!!!!!!!!");
   
  }
  
  onSubmit() {
    //this._addWorkoutService.addWorkout().subscribe(addedData => this.addWorkout = addedData);
    let workout = [
      { workoutId: 12, workoutTitle: 'Swimming',workoutNote : 'Swiming in pool for 30mins',caloriesBurnt: 200,categoryId: 5 }
    ];
    this._addWorkoutService.addWorkout(this.workout).subscribe(addedData => this.addWorkout = addedData);
  }

}
