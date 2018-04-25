import { Injectable } from '@angular/core';
import { IViewAllWorkout } from './viewall-workout';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ViewAllWorkoutService{

  constructor(private _http: HttpClient){
  
  }
  

  viewAllWorkout(): Observable<IViewAllWorkout[]>{
    console.log("<--------- Service call inititated---------------->");
    return this._http.get("http://localhost:8090/viewWorkout/all").map(this.extractData).catch(this.handleErrorObservable);
    //map((response: Response) => <IViewAllWorkout[]> response.json())
  }
  

  extractData(res: Response) {
    debugger
    let body = res;//.json();
    console.log("inside extractData --> body: " + body);
    return body || {};
  }
  handleErrorObservable (error: Response | any) {
    console.log("inside handleErrorObservable");
    console.error(error.message || error);
    return Observable.throw(error.message || error);
  } 

  deleteWorkout(workoutData):Observable<string>{
    var json = JSON.stringify(workoutData);
    var params = json;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    console.log("<--------- Service call inititated---------------->"+ params);
    return this._http.post("http://localhost:8090/deleteWorkout",params,httpOptions).map((response: Response) =>  response.json())
  }
}