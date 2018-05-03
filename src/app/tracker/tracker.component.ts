import { Component, OnInit } from '@angular/core';
import {GoogleChartComponent} from '../google-chart/google-chart.component';
import { ITrackWorkouts } from './tracker';
import { WorkoutTrackerService } from './tracker.service'

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.css'],
  providers: [WorkoutTrackerService]
})
export class TrackerComponent implements OnInit {
trackerData : ITrackWorkouts[];
  constructor(private _workoutTrackerService: WorkoutTrackerService) { }

  ngOnInit() {
    this._workoutTrackerService.fetchWorkoutTrackerDetails()
    .subscribe(data => {
        this.trackerData = data;
    })
  }

  public bar_ChartOptions = {
    title: 'Population of Largest U.S. Cities',
    chartArea: { width: '50%' },
    hAxis: {
        title: 'Total Population',
        minValue: 0,
        textStyle: {
            bold: true,
            fontSize: 12,
            color: '#4d4d4d'
        },
        titleTextStyle: {
            bold: true,
            fontSize: 18,
            color: '#4d4d4d'
        }
    },
    vAxis: {
        title: 'City',
        textStyle: {
            fontSize: 14,
            bold: true,
            color: '#848484'
        },
        titleTextStyle: {
            fontSize: 14,
            bold: true,
            color: '#848484'
        }
    }
};

public bar_ChartData = [
  ['Task', 'Hours per Day'],
  ['Work',     11],
  ['Eat',      2],
  ['Commute',  2],
  ['Watch TV', 2],
  ['Sleep',    7] ];

}
