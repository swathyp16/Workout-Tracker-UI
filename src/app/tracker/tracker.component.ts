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
dataVal: number[] = [1,1,1,1,1,1,1,1,1,1,1,1];
yearlyCaloriesBurnt : number = 0;
monthlyCaloriesBurnt : number = 0;
weeklyCaloriesBurnt : number = 0;
chartData:Array<any>;
  constructor(private _workoutTrackerService: WorkoutTrackerService,
    private datePipe: DatePipe) { 
        this.chartData = [
            {
              label: 'Yearly Calories Burnt',
              data: [1,1,1,1,1,1,1,1,1,1,1,1]
              //[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
              //[21, 56, 4, 31, 45, 15, 57, 61, 9, 17, 24, 59] 
             //data: this.calculateMonthlyCalories()
            }
        ];
    }

  ngOnInit() {
    this._workoutTrackerService.fetchWorkoutTrackerDetails()
    .subscribe(data => {
        //debugger
        this.trackerData = data;
            console.log("Tracker data : " + this.trackerData);
            this.OnClick(); 
            // debugger
            // for (let i = 0; i<this.dataVal.length ; i++) {
            //     this.chartData[0].data.push(this.dataVal[i]);
            // }  
    })
  }

  
  
    colors = [
        { 
        backgroundColor: 'rgba(30, 169, 224, 0.8)'
        }
    ]
    chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales : {
            yAxes: [{
               ticks: {
                  steps : 6,
                  stepValue : 200,
                  max : 1200,
                }
            }] 
          }
    }
    labels =  ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];      
    // chartData = [
    //     {
    //       label: 'Yearly Calories Burnt',
    //       data: this.dataVal
    //       //[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    //       //[21, 56, 4, 31, 45, 15, 57, 61, 9, 17, 24, 59] 
    //      //data: this.calculateMonthlyCalories()
    //     }
    // ];

    weeklyChartcolor = [
        { 
        backgroundColor: 'rgba(30, 169, 224, 0.8)'
        }
    ]
    weeklyChartlabels =  ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];      
    weeklyChartData = [
        {
          label: 'Weekly Calories Burnt',
          data: [21, 56, 4, 31, 45, 15, 57]
          //[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          //[21, 56, 4, 31, 45, 15, 57, 61, 9, 17, 24, 59] 
         //data: this.calculateMonthlyCalories()
        }
    ];

    monthlyChartcolor = [
        { 
        backgroundColor: 'rgba(30, 169, 224, 0.8)'
        }
    ]
    monthlyChartlabels =  ['Week1', 'Week2', 'Week3', 'Week4', 'Week5'];      
    monthlyChartData = [
        {
          label: 'Monthly Calories Burnt',
          data: [21, 56, 4, 31, 45]
          //[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          //[21, 56, 4, 31, 45, 15, 57, 61, 9, 17, 24, 59] 
         //data: this.calculateMonthlyCalories()
        }
    ];

    calculateMonthlyCalories(){
        //let calories = 0;
        for(var i=0; i < this.trackerData.monthlyWorkouts.length; i++){
            this.monthNumber = new Date(this.trackerData.monthlyWorkouts[i].startDate).getMonth();
            console.log("this.monthNumber : " + this.monthNumber);
             
           // this.chartData[0].data[this.monthNumber] = this.chartData[0].data[this.monthNumber] + this.trackerData.monthlyWorkouts[i].caloriesBurnt;
            //console.log("month name  : " +  )
        }
    }

    OnClick(){
        console.log("Months : " + this.trackerData.yearlyWorkouts);
        //debugger
        for(var i=0; i < this.trackerData.yearlyWorkouts.length; i++){
            this.monthNumber = new Date(this.trackerData.yearlyWorkouts[i].startDate).getMonth();
            console.log("this.monthNumber : " + this.monthNumber);
            console.log("Parsed calories: " + Number.parseInt(this.trackerData.yearlyWorkouts[i].caloriesBurnt));
            this.chartData[0].data[this.monthNumber] = this.chartData[0].data[this.monthNumber] + Number.parseInt(this.trackerData.yearlyWorkouts[i].caloriesBurnt);
            //console.log("month name  : " + this.chartData[0].data[this.monthNumber] );
            //debugger
            this.yearlyCaloriesBurnt = this.yearlyCaloriesBurnt + Number.parseInt(this.trackerData.yearlyWorkouts[i].caloriesBurnt);
        }
        //this.chartData[0].update();
        this.updateChart();
        console.log("this.dataVal : " + this.chartData[0].data);
        
        for(var i=0; i < this.trackerData.weeklyWorkouts.length; i++){
            this.dayNumber = new Date(this.trackerData.weeklyWorkouts[i].startDate).getDay();
            console.log("this.dayNumber : " + this.dayNumber);
            this.dayIndex = this.dayNumber-1;
            console.log("this.dayIndex : " + this.dayIndex);
            this.weeklyChartData[0].data[this.dayIndex] = this.weeklyChartData[0].data[this.dayIndex] + Number.parseInt(this.trackerData.weeklyWorkouts[i].caloriesBurnt);
            //console.log("month name  : " + this.chartData[0].data[this.monthNumber] );
            this.weeklyCaloriesBurnt = this.weeklyCaloriesBurnt + Number.parseInt(this.trackerData.weeklyWorkouts[i].caloriesBurnt);
        }
        debugger
        for(var i=0; i < this.trackerData.monthlyWorkouts.length; i++){
            this.weekNumber = Number.parseInt(this.datePipe.transform(new Date(this.trackerData.monthlyWorkouts[i].startDate), 'W'));
            console.log("this.weekNumber : " + this.weekNumber);
            this.weekIndex = this.weekNumber-1;
            console.log("this.weekIndex : " + this.weekIndex);
            this.monthlyChartData[0].data[this.weekIndex] = this.monthlyChartData[0].data[this.weekIndex] + Number.parseInt(this.trackerData.monthlyWorkouts[i].caloriesBurnt);
            //console.log("month name  : " + this.chartData[0].data[this.monthNumber] );
            this.monthlyCaloriesBurnt = this.monthlyCaloriesBurnt + Number.parseInt(this.trackerData.monthlyWorkouts[i].caloriesBurnt);
        }
    }

    updateChart() {
        //this.chart.chart.update();// This re-renders the canvas element.
        this.chartData[0].data.updateChart();
        
    }

 }

