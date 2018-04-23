import { Injectable } from '@angular/core';
import { IAddWorkout } from './create-workout';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AddWorkoutService{

  constructor(private _http: Http){
  
  }
  

  addWorkout(): Observable<IAddWorkout[]>{
    var json = JSON.stringify({workoutId: 4,workoutTitle:'skipping',workoutNote:'skipping daily',caloriesBurnt: 200,categoryId: 10});
    var params = 'json=' + json;
    var headers = new Headers();
    headers.append('Content-Type','application/x-www-form-urlencoded');//'application/x-www-form-urlencoded');
    console.log("<--------- Service call inititated---------------->");
    //return this._http.get("http://localhost:8080/createWorkout/all").map((response: Response) => <IAddWorkout[]> response.json())
   return this._http.post("http://localhost:8090/createWorkout/all",params,{headers:headers}).map((response: Response) => <IAddWorkout[]> response.json())
  }
  /*addWorkout(workout:IAddWorkout): Observable<IAddWorkout>{
    console.log("<--------- Service call inititated---------------->");    
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let workoutParams = [
      { workoutId: 12, workoutTitle: 'Swimming',workoutNote : 'Swiming in pool for 30mins',caloriesBurnt: 200,categoryId: 5 }
    ];
   // return this._http.get("http://localhost:8080/createWorkout/all",options).map((response: Response) => <IAddWorkout[]> response.json())
   return this._http.post("http://localhost:8080/createWorkout/all",workoutParams,options).map((response: Response) => <IAddWorkout> response.json());
  }*/

  extractData(res: Response) {
    let body = res.json();
    console.log("body: " + body);
    return body || {};
  }
  handleErrorObservable (error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.message || error);
  } 
}