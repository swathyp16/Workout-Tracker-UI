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
import 'rxjs/add/observable/throw';
import { NgForm } from '@angular/forms';
import { FormsModule,ReactiveFormsModule,FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Injectable()
export class AddWorkoutService{
  options: RequestOptions;
  headers: Headers;

  constructor(private _httpClient: HttpClient,
    private _http: Http){
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');  
    this.headers.append('Accept', 'application/json, */*'); 
    this.options = new RequestOptions({ headers: this.headers });
  }
  
  editWorkout(editArgs): Observable<IAddWorkout[]>{
    var json = JSON.stringify(editArgs[0]);
    var params = json;
    console.log("<--------- Service call inititated---------------->"+ params);
    return this._http.post("http://localhost:8090/createWorkout/all",params,this.options)
    .map(this.extractData)
    .catch(this.handleErrorObservable);
  }

  addWorkout(addWorkoutForm: NgForm): Observable<any>{
    var json = JSON.stringify(addWorkoutForm);
    var params = json;
    console.log("<--------- Service call inititated---------------->"+ params);
    return this._http.post("http://localhost:8090/createWorkout/all",params,this.options)
    .map(this.extractData)
    .catch(this.handleErrorObservable);
  }

  viewWorkoutCategory():Observable<IViewWorkoutCategory[]>{
    console.log("inside viewAllCategory");
    console.log("<--------- Service call inititated---------------->");
    return this._httpClient.get("http://localhost:8090/viewAllCategory")
    .map(this.extractData)
    .catch(this.handleErrorObservable);
  }
  
  extractData(res: Response) {
    let body = res;//.json();
    let responseStr = "";
    console.log("body: " + body);
    console.log("json body: " + JSON.stringify(body));
    return body || {};
  }
  handleErrorObservable (error: Response | any) {
    console.error(error._body);
    return Observable.throw(error || "Oops !! Something went wrong");
  } 

}