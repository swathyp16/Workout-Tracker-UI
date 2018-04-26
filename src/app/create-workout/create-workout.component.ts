import { Component, OnInit } from '@angular/core';
import { IAddWorkout } from './create-workout';
import { AddWorkoutService } from './create-workout.service';
import { IViewWorkoutCategory } from './view-workout-category';
import { FormsModule,ReactiveFormsModule,FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-workout',
  templateUrl: './create-workout.component.html',
  styleUrls: ['./create-workout.component.css'],
  providers: [AddWorkoutService]
})
export class CreateWorkoutComponent implements OnInit {
  viewCategoryList: IViewWorkoutCategory[];
  selectedCategory:IViewWorkoutCategory = new IViewWorkoutCategory();
  addWorkoutForm = new FormGroup({
    workoutId: new FormControl('', [<any>Validators.required]),
    workoutTitle: new FormControl(''),
    workoutNote: new FormControl('', <any>Validators.required),
    caloriesBurnt: new FormControl(''),
    categoryId: new FormControl('')
});
 addWorkout: IAddWorkout[];
  constructor(private _addWorkoutService: AddWorkoutService) {  
    
    console.log("hurrayyy !!!!!!!!!!!" + JSON.stringify(this.addWorkout));
   }
  
  ngOnInit() {
    this._addWorkoutService.viewWorkoutCategory().subscribe(viewCategoryList => this.viewCategoryList = viewCategoryList);
    console.log("yeahhhh !!!!!!!!!!!");
   
  }  

  onAddWorkoutFormSubmit(addForm: FormGroup): void{
   // console.log("addWorkoutForm : " + JSON.stringify(addForm.value));
    this._addWorkoutService.addWorkout(addForm.value).subscribe(addedData => this.addWorkout = addedData);
  }

  /*onAddWorkoutFormSubmit(addForm : NgForm): void{
    console.log("addWorkoutForm : " + JSON.stringify(addForm.value));
    this._addWorkoutService.addWorkout(addForm).subscribe(addedData => this.addWorkout = addedData);
  }*/

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
