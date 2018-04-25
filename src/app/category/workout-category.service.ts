import { Injectable } from '@angular/core';
import { IAddWorkoutCategory } from './workout-category';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Headers, RequestOptions } from '@angular/http';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { NgForm } from '@angular/forms';

@Injectable()
export class WorkoutCategoryService{

  constructor(private _http: HttpClient){
  
  }  

  addCategory(addCategoryForm : NgForm): Observable<IAddWorkoutCategory[]>{
   // addCategory(addCategoryForm : NgForm): Observable<String>{
    var json = JSON.stringify(addCategoryForm.value);
    var params = json;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    console.log("<--------- Service call inititated---------------->"+ params);
    return this._http.post("http://localhost:8090/createCategory",params,httpOptions).map((response: Response) => <IAddWorkoutCategory[]> response.json())
    //return this._http.post("http://localhost:8090/createCategory",params,httpOptions).map((response: Response) => <String> response.json())
  }

  viewAllCategory():Observable<IAddWorkoutCategory[]>{
    console.log("inside viewAllCategory");
    console.log("<--------- Service call inititated---------------->");
    return this._http.get("http://localhost:8090/viewAllCategory").map(this.extractData).catch(this.handleErrorObservable);
  }
  
  deleteCategory(category):Observable<string>{
    var json = JSON.stringify(category);
    var params = json;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    console.log("<--------- Service call inititated---------------->"+ params);
    return this._http.post("http://localhost:8090/deleteCategory",params,httpOptions).map((response: Response) =>  response.json())
  }

  extractData(res: Response) {
    let body = res;//.json();
    console.log("body: " + body);
    return body || {};
  }
  handleErrorObservable (error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.message || error);
  } 
}