import { Injectable } from '@angular/core';
import { IEditWorkout } from './edit-workout';
<<<<<<< HEAD
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
=======
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Headers, RequestOptions } from '@angular/http';
>>>>>>> d5236eb7a9283d8022c973773b91c11dc99a2661
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
<<<<<<< HEAD
import { IAddWorkout } from '../create-workout/create-workout';
=======
>>>>>>> d5236eb7a9283d8022c973773b91c11dc99a2661

@Injectable()
export class EditWorkoutService{

<<<<<<< HEAD
  options: RequestOptions;
  headers: Headers;

  

  constructor(private _http: Http){
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');  
    this.headers.append('Accept', 'application/json, */*'); 
    this.options = new RequestOptions({ headers: this.headers });
    }
  

  fetchEditWorkoutDetails(id): Observable<IAddWorkout[]>{
    //var json = JSON.stringify(id);

    console.log("<--------- Service call inititated---------------->"+ id);
    return this._http.get("http://localhost:8090/editWorkout/"+id, this.options)
    .map((response: Response) => <IAddWorkout[]> response.json())
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
  
=======
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
  
>>>>>>> d5236eb7a9283d8022c973773b91c11dc99a2661
}