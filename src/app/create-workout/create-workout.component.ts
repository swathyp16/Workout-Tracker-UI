import { Component, OnInit } from '@angular/core';
import { IAddWorkout } from './create-workout';
import { AddWorkoutService } from './create-workout.service';
import { IViewWorkoutCategory } from './view-workout-category';
import { FormsModule,ReactiveFormsModule,FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { Response } from '@angular/http';
import { DecimalPipe } from '@angular/common';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'app-create-workout',
  templateUrl: './create-workout.component.html',
  styleUrls: ['./create-workout.component.css'],
  providers: [AddWorkoutService]
})
export class CreateWorkoutComponent implements OnInit {
  viewCategoryList: IViewWorkoutCategory[];
  selectedCategory:IViewWorkoutCategory = new IViewWorkoutCategory();

 addWorkout: Response;
 successMessage: string = "";
 errorMessage: string = "";
 caloriesBurnt: number;
 calories: number;
 step: number = 0.1;
 decimalPipe : DecimalPipe;
  constructor(private _addWorkoutService: AddWorkoutService) { }
  
  ngOnInit() {
    this._addWorkoutService.viewWorkoutCategory().subscribe(viewCategoryList => this.viewCategoryList = viewCategoryList);
  }  

  onAddWorkoutFormSubmit(addForm : NgForm): void{
    this._addWorkoutService.addWorkout(addForm.value).subscribe(data => {
      this.addWorkout = data;
       if(this.addWorkout.status == 200){
          this.successMessage = "Successfully added the workout item";
        }
      },error =>{
        this.errorMessage = "Oops !! Something went wrong";
      }
      );
  }

  onSelect(args) { 
    this.selectedCategory = null;
        for (var i = 0; i < this.viewCategoryList.length; i++)
        {
          if (this.viewCategoryList[i].categoryName == args.target.options[args.target.selectedIndex].text) {
            this.selectedCategory = this.viewCategoryList[i];
          }
        }
    }

incrementValue(){
  console.log("calories Burnt : " + this.caloriesBurnt);
  this.caloriesBurnt = this.caloriesBurnt*1 + this.step*1;
  console.log("calories Burnt amount : " + this.caloriesBurnt);
}

decrementValue(){
  this.caloriesBurnt = this.caloriesBurnt*1 - this.step*1;
}


}
