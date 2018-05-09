import { Injectable } from '@angular/core';
import { IEditWorkout } from './edit-workout';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { IAddWorkout } from '../create-workout/create-workout';

@Injectable()
export class EditWorkoutService{
  options: RequestOptions;
  headers: Headers;  

  constructor(private _http: Http){
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');  
    this.headers.append('Accept', 'application/json, */*'); 
    this.options = new RequestOptions({ headers: this.headers });
    }
  

  fetchEditWorkoutDetails(id): Observable<IAddWorkout[]>{
    return this._http.get("http://localhost:8090/editWorkout/"+id, this.options)
    .map((response: Response) =>  response.json())
    .catch(this.handleErrorObservable);
  }

  extractData(res: Response) {
    let body = res.json();
    return body;
  }
  
  handleErrorObservable (error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.message || error);
  } 
  
}