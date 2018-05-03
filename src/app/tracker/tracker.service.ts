import { Injectable } from '@angular/core';
import { ITrackWorkouts } from './tracker';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class WorkoutTrackerService{
  options: RequestOptions;
  headers: Headers;  

  constructor(private _http: Http){
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');  
    this.headers.append('Accept', 'application/json, */*'); 
    this.options = new RequestOptions({ headers: this.headers });
    }
  

  fetchWorkoutTrackerDetails(): Observable<ITrackWorkouts[]>{
    //var json = JSON.stringify(id);

    console.log("<--------- Service call inititated---------------->");
    return this._http.get("http://localhost:8090/workoutTracker/", this.options)
    .map((response: Response) =>  response.json())
    .catch(this.handleErrorObservable);
  }

  extractData(res: Response) {
    debugger
    let body = res.json();
    console.log("edit body: " + JSON.stringify(body));
    return body;
  }
  
  handleErrorObservable (error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.message || error);
  } 
  
}