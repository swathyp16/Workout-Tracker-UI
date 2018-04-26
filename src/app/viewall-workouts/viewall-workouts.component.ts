import { Component, OnInit } from '@angular/core';
import { ViewAllWorkoutService } from './viewall-workout.service';
import { IViewAllWorkout } from './viewall-workout';

@Component({
  selector: 'app-viewall-workouts',
  templateUrl: './viewall-workouts.component.html',
  styleUrls: ['./viewall-workouts.component.css'],
  providers: [ViewAllWorkoutService]
})
export class ViewallWorkoutsComponent implements OnInit {
 viewAllWorkout: IViewAllWorkout[];
 //private isEditWorkout: boolean = false;
 deleteWorkoutStatus: string;
  constructor(private _viewallWorkoutService: ViewAllWorkoutService) {
   // this.isEditWorkout = false;
   }


  ngOnInit() {
    //this.isEditWorkout = false;
    this._viewallWorkoutService.viewAllWorkout().subscribe(viewAllWorkout => this.viewAllWorkout = viewAllWorkout);
    console.log("View All Response : "+ this.viewAllWorkout);
  }

  deleteWorkout(workoutData,index){
    console.log("delete workout details : " + JSON.stringify(workoutData));
    this._viewallWorkoutService.deleteWorkout(workoutData).subscribe(deleteWorkoutStatus => this.deleteWorkoutStatus = deleteWorkoutStatus);
    console.log("delete category status: "+ this.deleteWorkoutStatus);
    this.viewAllWorkout.splice(index,1);
  }

  
  // ResetEditWorkoutFlag() {
  //   this.isEditWorkout = false;
  // }

}
