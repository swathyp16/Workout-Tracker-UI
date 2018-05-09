import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/switchMap';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { EditWorkoutService } from '../edit-workout/edit-workout.service';
import { IStartEndWorkout } from '../start-end-workout/start-end-workout';
import { IAddWorkout } from '../create-workout/create-workout';
import { DatePipe } from '@angular/common';
import { SharedServiceService } from './../shared-service.service';
import { StartWorkoutService } from '../start-end-workout/start-end-workout.service';
import { Response } from '@angular/http';
import { HttpErrorResponse } from '@angular/common/http';

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
  startWorkoutStatus: Response;
 errorStatus: HttpErrorResponse;
  successMessage: string = "";
  errorMessage: string = "";
  isDisableStartBtn: boolean = false;
  isDisableEndBtn: boolean = false;
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
       this.startParams = <IStartEndWorkout[]>this.fetchedDetails;
       if(this.startButtonIdFlag){
        this.startParams[0].startDate = this.formatDate(Date.now());
        this.startParams[0].startTime = this.formatTime(Date.now());
        this.startParams[0].startWorkoutFlag = true;
       }else{
        this.startParams[0].endDate = this.formatDate(Date.now());
        this.startParams[0].endTime = this.formatTime(Date.now());
        this.startParams[0].startWorkoutFlag = false;
       } 
    });
   }

  ngOnInit() {
    this._sharedService.startButtonClicked.subscribe(data =>{
      this.startButtonIdFlag = data;
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
      if(this.startWorkoutStatus.status == 200){
        this.successMessage = "Workout Started";
        this.isDisableStartBtn = true;
        this._sharedService.setDisableEndButtonFlag(false);
      }
    },error =>{
      this.errorStatus = error;
      let body = error.json();
      this.errorMessage = body.message?body.message:"Oops !! Something went wrong";
    });
  }
    onEndWorkoutFormSubmit(){
      this._startWorkoutService.startWorkout(this.startParams).subscribe(data => {
        this.startWorkoutStatus = data;
        if(this.startWorkoutStatus.status == 200){
          this.successMessage = "Workout Ended";
          this.isDisableEndBtn = true;
        }
      },error =>{
        this.errorStatus = error;
        let body = error.json();
        this.errorMessage = body.message?body.message:"Oops !! Something went wrong";
      });
  }

  onCancelBtnPress(){
    this.router.navigate(['/viewAll']);
  }

  disableStartBtn(){
    return this.isDisableStartBtn;
  }

  disableEndBtn(){
    return this.isDisableEndBtn;
  }

 
}
