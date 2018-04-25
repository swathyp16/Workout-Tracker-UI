import { Injectable } from '@angular/core';
import { IEditWorkout } from './edit-workout';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class EditWorkoutService{

  constructor(private _http: HttpClient){
  
  }
  

  fetchEditWorkoutDetails(id): Observable<any>{
    var json = JSON.stringify(id);
    var params = json;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    console.log("<--------- Service call inititated---------------->"+ params);
    return this._http.post("http://localhost:8090/editWorkout",params,httpOptions).map((response: Response) => <any> response)
  }
  
}