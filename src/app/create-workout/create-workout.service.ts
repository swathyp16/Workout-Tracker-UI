import { Injectable } from '@angular/core';
import { IAddWorkout } from './create-workout';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Headers, RequestOptions } from '@angular/http';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { NgForm } from '@angular/forms';

@Injectable()
export class AddWorkoutService{

  constructor(private _http: HttpClient){
  
  }
  

  addWorkout(addForm : NgForm): Observable<IAddWorkout[]>{
    var json = JSON.stringify(addForm.value);
    var params = json;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    console.log("<--------- Service call inititated---------------->"+ params);
    return this._http.post("http://localhost:8090/createWorkout/all",params,httpOptions).map((response: Response) => <IAddWorkout[]> response.json())
  }
  
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