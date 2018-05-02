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
  options: RequestOptions;
  headers: Headers;

  constructor(private _httpClient: HttpClient,
    private _http: Http){
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');  
    this.headers.append('Accept', 'application/json, */*'); 
    this.options = new RequestOptions({ headers: this.headers });
  }
  

  viewAllWorkout(): Observable<IViewAllWorkout[]>{
    console.log("<--------- Service call inititated---------------->");
    return this._httpClient.get("http://localhost:8090/viewAllWorkout").map(this.extractData).catch(this.handleErrorObservable);
    //map((response: Response) => <IViewAllWorkout[]> response.json())
  }
  

  extractData(res: Response) {
    let body = res;//.json();
    console.log("inside extractData --> body: " + body);
    return body || {};
  }
  handleErrorObservable (error: Response | any) {
    console.log("inside handleErrorObservable");
    console.error(error.message || error);
    return Observable.throw(error.message || error);
  } 

  deleteWorkout(workoutData):Observable<any>{
    var params = JSON.stringify(workoutData);
    // var params = json;
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type':  'application/json'
    //   })
    // };
    console.log("<--------- Service call inititated---------------->"+ params);
    return this._http.post("http://localhost:8090/deleteWorkout",params,this.options)
    .map(this.extractData)
    .catch(this.handleErrorObservable);
  }
}