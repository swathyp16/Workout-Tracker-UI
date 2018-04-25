import { Component, OnInit } from '@angular/core';
import { IAddWorkout } from './create-workout';
import { AddWorkoutService } from './create-workout.service';
import { IViewWorkoutCategory } from './view-workout-category';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-workout',
  templateUrl: './create-workout.component.html',
  styleUrls: ['./create-workout.component.css'],
  providers: [AddWorkoutService]
})
export class CreateWorkoutComponent implements OnInit {
  workout = new IAddWorkout();   
  viewCategoryList: IViewWorkoutCategory[];
  selectedCategory:IViewWorkoutCategory = new IViewWorkoutCategory();

 addWorkout: IAddWorkout[];
  constructor(private _addWorkoutService: AddWorkoutService) {  
    
    console.log("hurrayyy !!!!!!!!!!!" + JSON.stringify(this.addWorkout));
   }
  
  ngOnInit() {
    this._addWorkoutService.viewWorkoutCategory().subscribe(viewCategoryList => this.viewCategoryList = viewCategoryList);
    console.log("yeahhhh !!!!!!!!!!!");
   
  }  

  onAddWorkoutFormSubmit(addForm : NgForm): void{
    console.log("addWorkoutForm : " + JSON.stringify(addForm.value));
    this._addWorkoutService.addWorkout(addForm).subscribe(addedData => this.addWorkout = addedData);
  }

  onSelect(args) { 
debugger
//console.log("onSelect selectedCategoryId : " + JSON.stringify(args.target.options[0]));
this.selectedCategory = null;
    for (var i = 0; i < this.viewCategoryList.length; i++)
    {
      if (this.viewCategoryList[i].categoryName == args.target.options[args.target.selectedIndex].text) {
        this.selectedCategory = this.viewCategoryList[i];
      }
    }
}

}
