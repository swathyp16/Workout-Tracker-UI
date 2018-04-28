import { Component, OnInit } from '@angular/core';
import { ViewAllWorkoutService } from './viewall-workout.service';
import { IViewAllWorkout } from './viewall-workout';
import { SharedServiceService } from './../shared-service.service';

@Component({
  selector: 'app-viewall-workouts',
  templateUrl: './viewall-workouts.component.html',
  styleUrls: ['./viewall-workouts.component.css'],
  providers: [ViewAllWorkoutService]
})
export class ViewallWorkoutsComponent implements OnInit {
 viewAllWorkout: IViewAllWorkout[];
 deleteWorkoutStatus: string;
  constructor(
    private _viewallWorkoutService: ViewAllWorkoutService,  
    private _sharedService: SharedServiceService
  ) {}


  ngOnInit() {
    this._viewallWorkoutService.viewAllWorkout().subscribe(viewAllWorkout => this.viewAllWorkout = viewAllWorkout);
  }

  deleteWorkout(workoutData,index){
    this._viewallWorkoutService.deleteWorkout(workoutData).subscribe(deleteWorkoutStatus => this.deleteWorkoutStatus = deleteWorkoutStatus);
    this.viewAllWorkout.splice(index,1);
  }

  onClick(event){
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.value;
   if(idAttr == "Start"){
      this._sharedService.setStartBtnFlag(true);
    } else if(idAttr == "End"){
      this._sharedService.setEndBtnFlag(true); 
    }
  }

}
