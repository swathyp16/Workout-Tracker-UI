import { Injectable } from '@angular/core';
import { IAddWorkout } from './create-workout';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Headers, RequestOptions } from '@angular/http';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { IViewWorkoutCategory } from './view-workout-category';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { NgForm } from '@angular/forms';
import { FormsModule,ReactiveFormsModule,FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Injectable()
export class AddWorkoutService{

  constructor(private _http: HttpClient){
  
  }
  

  addWorkout(addWorkoutForm: FormGroup): Observable<IAddWorkout[]>{
    var json = JSON.stringify(addWorkoutForm);
    var params = json;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    console.log("<--------- Service call inititated---------------->"+ params);
    return this._http.post("http://localhost:8090/createWorkout/all",params,httpOptions).map((response: Response) => <IAddWorkout[]> response.json())
  }

  viewWorkoutCategory():Observable<IViewWorkoutCategory[]>{
    console.log("inside viewAllCategory");
    console.log("<--------- Service call inititated---------------->");
    return this._http.get("http://localhost:8090/viewAllCategory")
    .map(this.extractData)
    .catch(this.handleErrorObservable);
  }
  
  extractData(res: Response) {
    let body = res;//.json();
    console.log("body: " + JSON.stringify(body));
    return body || {};
  }
  handleErrorObservable (error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.message || error);
  } 
}