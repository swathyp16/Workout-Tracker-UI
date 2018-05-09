import { Component, OnInit,ViewChild  } from '@angular/core';
import {GoogleChartComponent} from '../google-chart/google-chart.component';
import { ITrackWorkouts } from './tracker';
import { WorkoutTrackerService } from './tracker.service'
import { DatePipe } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts/ng2-charts';

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.css'],
  providers: [WorkoutTrackerService,DatePipe]
})
export class TrackerComponent implements OnInit {
@ViewChild(BaseChartDirective)
public chart: BaseChartDirective;
trackerData : ITrackWorkouts;
monthNumber : number;
dayNumber : number;
weekNumber : number;
dayIndex: number;
weekIndex: number;
dataVal: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
monthDataVal: number[] = [0, 0, 0, 0, 0];
weekDataVal: number[] = [0, 0, 0, 0, 0, 0, 0];
yearlyCaloriesBurnt : number = 0;
monthlyCaloriesBurnt : number = 0;
weeklyCaloriesBurnt : number = 0;
workoutDuration : number;
workoutDurationInWeek : number;
workoutDurationInMonth : number;
caloriesBurnt: number;
caloriesWeekly : number;
caloriesMonthly : number;
formattedStartDt: string;
formattedEndDt: string;
chartData:Array<any> = [
    {
      label: 'Yearly Calories Burnt',
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }
];
monthlyChartData:Array<any> = [
    {
      label: 'Monthly Calories Burnt',
      data: [0, 0, 0, 0, 0]
    }
];
weeklyChartData:Array<any> = [
    {
      label: 'Weekly Calories Burnt',
      data: [0, 0, 0, 0, 0, 0, 0]
    }
];
  constructor(private _workoutTrackerService: WorkoutTrackerService,
    private datePipe: DatePipe) {}

  ngOnInit() {
    this._workoutTrackerService.fetchWorkoutTrackerDetails()
    .subscribe(data => {
        this.trackerData = data;
        this.renderChart(); 
    })
  }

  public chartClicked(e:any):void {
    console.log(e);
  }
  
    chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales : {
            yAxes: [{
               ticks: {
                  //steps : 10,
                  stepValue : 200,
                  //max : 2000,
                }
            }] 
          }
    }
    colors = [
        { 
        backgroundColor: 'rgba(224, 189, 34, 0.8)'
        }
    ]
    labels =  ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];      

    weeklyChartcolor = [
        { 
        backgroundColor: 'rgba(30, 169, 224 , 0.8)'
        }
    ]
    weeklyChartlabels =  ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];   
    monthlyChartcolor = [
        { 
        backgroundColor: 'rgba(224, 99, 34, 0.8)'
        }
    ]
    monthlyChartlabels =  ['Week1', 'Week2', 'Week3', 'Week4', 'Week5'];      

    renderChart(){
        for(var i=0; i < this.trackerData.yearlyWorkouts.length; i++){
            this.monthNumber = new Date(this.trackerData.yearlyWorkouts[i].startDate).getMonth();
            this.workoutDuration = this.getWorkoutTimeInMinutes(this.trackerData.yearlyWorkouts[i]);
            this.caloriesBurnt = this.workoutDuration * Number.parseInt(this.trackerData.yearlyWorkouts[i].caloriesBurnt);
            this.dataVal[this.monthNumber] = this.dataVal[this.monthNumber] + this.caloriesBurnt;
            this.yearlyCaloriesBurnt = this.yearlyCaloriesBurnt + this.caloriesBurnt;
        }
        for(var i=0; i < this.trackerData.weeklyWorkouts.length; i++){
            this.dayNumber = new Date(this.trackerData.weeklyWorkouts[i].startDate).getDay();
            this.dayIndex = this.dayNumber-1;
            this.workoutDurationInWeek = this.getWorkoutTimeInMinutes(this.trackerData.weeklyWorkouts[i]);
            this.caloriesWeekly = this.workoutDurationInWeek * Number.parseInt(this.trackerData.weeklyWorkouts[i].caloriesBurnt);
            this.weekDataVal[this.dayIndex] = this.weekDataVal[this.dayIndex] + this.caloriesWeekly;
            this.weeklyCaloriesBurnt = this.weeklyCaloriesBurnt + this.caloriesWeekly;
        }
        for(var i=0; i < this.trackerData.monthlyWorkouts.length; i++){
            this.weekNumber = Number.parseInt(this.datePipe.transform(new Date(this.trackerData.monthlyWorkouts[i].startDate), 'W'));
            this.weekIndex = this.weekNumber-1;
            this.workoutDurationInMonth = this.getWorkoutTimeInMinutes(this.trackerData.monthlyWorkouts[i]);
            this.caloriesMonthly = this.workoutDurationInMonth * Number.parseInt(this.trackerData.monthlyWorkouts[i].caloriesBurnt);
            this.monthDataVal[this.weekIndex] = this.monthDataVal[this.weekIndex] + this.caloriesMonthly;
            this.monthlyCaloriesBurnt = this.monthlyCaloriesBurnt + this.caloriesMonthly;
        }
        this.chartData = [
            {
              label: 'Monthly Calories Burnt',
              data: this.dataVal 
            }
        ];
        this.monthlyChartData = [
            {
              label: 'Weekly Calories Burnt',
              data: this.monthDataVal 
            }
        ];
        this.weeklyChartData = [
            {
              label: 'Daily Calories Burnt',
              data: this.weekDataVal 
            }
        ];
    }

   getWorkoutTimeInMinutes(element){
    this.formattedStartDt = this.formatDate(element.startDate);
    this.formattedEndDt = this.formatDate(element.endDate);
    var wrkStartTime = Date.parse(this.formattedStartDt+'T'+element.startTime);
    var wrkEndTime = Date.parse(this.formattedEndDt+'T'+element.endTime);
    var workoutTimeInMins = Math.ceil((Math.abs(wrkStartTime-wrkEndTime))/(1000*60));
    return workoutTimeInMins;
    }

    formatDate(newDate){
        const formattedDate = this.datePipe.transform(newDate,'yyyy-MM-dd');
        return formattedDate; 
      }

 }

