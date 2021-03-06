import { Component, OnInit } from '@angular/core';
import { ViewAllWorkoutService } from './viewall-workout.service';
import { IViewAllWorkout } from './viewall-workout';
import { SharedServiceService } from './../shared-service.service';
import { SearchFilterPipe } from './../search-filter.pipe';

@Component({
  selector: 'app-viewall-workouts',
  templateUrl: './viewall-workouts.component.html',
  styleUrls: ['./viewall-workouts.component.css'],
  providers: [ViewAllWorkoutService]
})
export class ViewallWorkoutsComponent implements OnInit {
 viewAllWorkout: IViewAllWorkout[];
 deleteWorkoutStatus: Response;
 disableEndButton: boolean = true;
 successMessage: string = "";
 errorMessage: string = "";
  constructor(
    private _viewallWorkoutService: ViewAllWorkoutService,  
    private _sharedService: SharedServiceService
  ) {}


  ngOnInit() {
    this._viewallWorkoutService.viewAllWorkout().subscribe(viewAllWorkout => this.viewAllWorkout = viewAllWorkout);
    this._sharedService.disableViewAllEndButton.subscribe(data =>{
      this.disableEndButton = data;
   });
  }

  deleteWorkout(workoutData,index){
    this._viewallWorkoutService.deleteWorkout(workoutData)
    .subscribe(data =>{
      this.deleteWorkoutStatus = data;
      if(this.deleteWorkoutStatus.status == 200){
        this.successMessage = "Successfully deleted the Workout item";
        this.viewAllWorkout.splice(index,1);
      }
    },error =>{
      this.errorMessage = "Oops !! Something went wrong";
    });    
  }

  onClick(event,workoutData,index){
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.value;
   if(idAttr == "Start"){
      this._sharedService.setStartBtnFlag(true);     
    } else if(idAttr == "End"){
      this._sharedService.setStartBtnFlag(false); 
    }
    
  }

 
}
