import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { IStartEndWorkout } from '../start-end-workout/start-end-workout';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class StartWorkoutService{
  options: RequestOptions;
  headers: Headers;  

  constructor(private _http: Http){
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');  
    this.headers.append('Accept', 'application/json, */*'); 
    this.options = new RequestOptions({ headers: this.headers });
  }
  
  startWorkout(startArgs): Observable<any>{
    var json = JSON.stringify(startArgs[0]);
    var params = json;
    console.log("<--------- Service call inititated---------------->"+ params);
    return this._http.post("http://localhost:8090/startWorkout",params,this.options)
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
  handleErrorObservable (error: HttpErrorResponse | any) {
    console.error(error);
    // let body = error.json();
    // console.log("Error message: "+ body.error + body.message);
    //let errorResp = JSON.stringify(body);//body.error || JSON.stringify(body);
   // console.log("hdfgsdh: "+ errorResp);
    return Observable.throw(error || error.message);
  } 

}