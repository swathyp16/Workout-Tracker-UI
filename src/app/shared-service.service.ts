import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class SharedServiceService {

  private endButtonIdFlag = new BehaviorSubject<boolean>(false);
  private startButtonIdFlag = new BehaviorSubject<boolean>(false);
  private disableEndButton = new BehaviorSubject<boolean>(true);
  private viewAllEndButtonClicked = new BehaviorSubject<boolean>(false);

  constructor() { }
  
  setStartBtnFlag(startBtnValue){
      return this.startButtonIdFlag.next(startBtnValue);
  }
  
  setEndBtnFlag(endBtnValue){
    this.endButtonIdFlag.next(endBtnValue);
  }

  setDisableEndButtonFlag(endBtn){
    return this.disableEndButton.next(endBtn);
  }
  
  setViewAllEndBtnFlag(viewAllEndBtn){
    this.viewAllEndButtonClicked.next(viewAllEndBtn);
  }

  getDisableEndButtonFlag(){
    console.log("*************** end btn value : **********" +this.disableEndButton.getValue());
    return this.disableEndButton.getValue();
  }

  startButtonClicked = this.startButtonIdFlag.asObservable();
  endButtonClicked = this.endButtonIdFlag.asObservable();
  disableViewAllEndButton = this.disableEndButton.asObservable();
  viewAllEndButton = this.viewAllEndButtonClicked.asObservable();

}
