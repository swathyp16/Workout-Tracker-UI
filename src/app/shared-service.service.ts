import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class SharedServiceService {

  private endButtonIdFlag = new BehaviorSubject<boolean>(false);
  private startButtonIdFlag = new BehaviorSubject<boolean>(false);

  constructor() { }
  
  setStartBtnFlag(startBtnValue){
      return this.startButtonIdFlag.next(startBtnValue);
  }
  
  setEndBtnFlag(endBtnValue){
    this.endButtonIdFlag.next(endBtnValue);
  }
  startButtonClicked = this.startButtonIdFlag.asObservable();
  endButtonClicked = this.endButtonIdFlag.asObservable();

}
