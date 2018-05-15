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
  options: RequestOptions;
  headers: Headers;

  constructor(private _httpClient: HttpClient,
    private _http: Http){
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');  
    this.headers.append('Accept', 'application/json, */*'); 
    this.options = new RequestOptions({ headers: this.headers });
  }  

  addCategory(addCategoryForm : NgForm): Observable<any>{
    var params = JSON.stringify(addCategoryForm.value);
    return this._http.post("http://localhost:8090/createCategory",params,this.options)
    .map(this.extractData)
    .catch(this.handleErrorObservable);
  }

  viewAllCategory():Observable<IAddWorkoutCategory[]>{
    return this._httpClient.get("http://localhost:8090/viewAllCategory")
    .map(this.extractData)
    .catch(this.handleErrorObservable);
  }
  
  deleteCategory(category):Observable<any>{
    var params = JSON.stringify(category);
    return this._http.post("http://localhost:8090/deleteCategory",params,this.options)
    .map(this.extractData)
    .catch(this.handleErrorObservable);
  }

  editCategory(category):Observable<any>{
    var params = JSON.stringify(category);
    return this._http.post("http://localhost:8090/createCategory",params,this.options)
    .map(this.extractData)
    .catch(this.handleErrorObservable);
  }

  extractData(res: Response) {
    let body = res;//.json();
    return body || {};
  }
  handleErrorObservable (error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error || "Oops !! Something went wrong");
  } 
}