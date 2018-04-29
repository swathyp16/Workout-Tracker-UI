import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/switchMap';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { EditWorkoutService } from '../edit-workout/edit-workout.service';
import { IStartEndWorkout } from '../start-end-workout/start-end-workout';
import { IAddWorkout } from '../create-workout/create-workout';
import { DatePipe } from '@angular/common';
import { SharedServiceService } from './../shared-service.service';
import { StartWorkoutService } from '../start-end-workout/start-end-workout.service'

@Component({
  selector: 'app-start-end-workout',
  templateUrl: './start-end-workout.component.html',
  styleUrls: ['./start-end-workout.component.css'],
  providers: [EditWorkoutService,StartWorkoutService]
})
export class StartEndWorkoutComponent implements OnInit {
  startParams: IStartEndWorkout[];
  fetchedDetails: IAddWorkout[];
  datePipe = new DatePipe("en-US");
  startButtonIdFlag: boolean;
  endButtonIdFlag: boolean;
  startWorkoutStatus: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _editWorkoutService: EditWorkoutService,
    private _sharedService: SharedServiceService,
    private _startWorkoutService: StartWorkoutService
  ) {
    let id = this.route.snapshot.paramMap.get('id');
    this._editWorkoutService.fetchEditWorkoutDetails(id)
    .subscribe(data =>{
    this.fetchedDetails = data;
      console.log("fetched data is !!!!! : "+ this.fetchedDetails +"btn: "+ this.startButtonIdFlag);
       this.startParams = <IStartEndWorkout[]>this.fetchedDetails;
       if(this.startButtonIdFlag){
        this.startParams[0].startDate = this.formatDate(Date.now());
        this.startParams[0].startTime = this.formatTime(Date.now());
        this.startParams[0].startWorkoutFlag = true;
        console.log("new start data is !!!!! : "+ JSON.stringify(this.startParams));
       }else{
        this.startParams[0].endDate = this.formatDate(Date.now());
        this.startParams[0].endTime = this.formatTime(Date.now());
        this.startParams[0].startWorkoutFlag = false;
        console.log("new end data is !!!!! : "+ JSON.stringify(this.startParams));
       } 
    });
   }

  ngOnInit() {
    this._sharedService.startButtonClicked.subscribe(data =>{
      this.startButtonIdFlag = data;
      console.log("start btn value : "+ this.startButtonIdFlag);
   });
   this._sharedService.endButtonClicked.subscribe(data =>{
    this.endButtonIdFlag = data;
    console.log("end btn value : "+ this.endButtonIdFlag);
 });
  }

  formatDate(startDt){
    const formattedDate = this.datePipe.transform(startDt,'dd/MM/yyyy');
    return formattedDate;
  }

  formatTime(startTime){
    const formattedTime = this.datePipe.transform(startTime,'HH:mm:ss');
    return formattedTime;
  }

  onStartWorkoutFormSubmit(){
    this._startWorkoutService.startWorkout(this.startParams).subscribe(data => {
      this.startWorkoutStatus = data;
    });
  }
    onEndWorkoutFormSubmit(){
      this._startWorkoutService.startWorkout(this.startParams).subscribe(data => {
        this.startWorkoutStatus = data;
      });
  }

  onCancelBtnPress(){
    this.router.navigate(['/viewAll']);
  }

 
}
