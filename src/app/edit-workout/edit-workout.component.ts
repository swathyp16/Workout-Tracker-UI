import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/switchMap';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { IEditWorkout } from './edit-workout';
import { EditWorkoutService } from './edit-workout.service';
import { IAddWorkoutCategory } from '../category/workout-category';
import { IViewWorkoutCategory } from '../create-workout/view-workout-category';
import { WorkoutCategoryService } from '../category/workout-category.service';
import { AddWorkoutService } from '../create-workout/create-workout.service';
<<<<<<< HEAD
import { FormsModule, ReactiveFormsModule ,FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
=======
import { NgForm } from '@angular/forms';
>>>>>>> d5236eb7a9283d8022c973773b91c11dc99a2661
import { IAddWorkout } from '../create-workout/create-workout';

@Component({
  selector: 'app-edit-workout',
  templateUrl: './edit-workout.component.html',
  styleUrls: ['./edit-workout.component.css'],
  providers: [EditWorkoutService,WorkoutCategoryService,AddWorkoutService]
})
export class EditWorkoutComponent implements OnInit {
<<<<<<< HEAD
  //public editWorkoutsForm: FormGroup; 
  editDetails: IAddWorkout[];
  viewCategoryForEdit: IAddWorkoutCategory[];
  categoryList:IAddWorkoutCategory = new IAddWorkoutCategory();
  addWorkout: IAddWorkout[];
  editWorkoutsForm = new FormGroup({
    workoutId: new FormControl(''),
    workoutTitle: new FormControl(''),
    workoutNote: new FormControl(''),
    caloriesBurnt: new FormControl(''),
    categoryId: new FormControl('')
});
  
=======
  editDetails: IEditWorkout;
  viewCategoryForEdit: IAddWorkoutCategory[];
  categoryList:IAddWorkoutCategory = new IAddWorkoutCategory();
  addWorkout: IAddWorkout[];
>>>>>>> d5236eb7a9283d8022c973773b91c11dc99a2661
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _editWorkoutService: EditWorkoutService,
    private _workoutCategoryService: WorkoutCategoryService,
    private _addWorkoutService: AddWorkoutService
  ) {}

  ngOnInit() {
<<<<<<< HEAD
    
    let id = this.route.snapshot.paramMap.get('id');
    console.log("<-----------ID ------------->" + id);
    debugger
    this._editWorkoutService.fetchEditWorkoutDetails(id)
    .subscribe(data =>{
    //this.selectedworkout[0] = data;
    this.editDetails = data;
      console.log("data is !!!!! : "+ this.editDetails)
    });
    debugger
    this._workoutCategoryService.viewAllCategory().subscribe(viewCategoryForEdit => this.viewCategoryForEdit = viewCategoryForEdit);
    //if(this.editDetails && this.editDetails!= undefined){
      for(var i= 0;i< this.editDetails.length; i++){
          this.editWorkoutsForm.setValue({        
          workoutId:this.editDetails[i].workoutId,
          workoutTitle:this.editDetails[i].workoutTitle,
          workoutNote:this.editDetails[i].workoutNote,
          caloriesBurnt:this.editDetails[i].caloriesBurnt,
          categoryId:this.editDetails[i].categoryId
        });
      }      
   // }
    console.log("edit workut service value : " + JSON.stringify(this.editWorkoutsForm.value));
=======
    let id = this.route.snapshot.paramMap.get('id');
    console.log("<-----------ID ------------->" + id);
    this._editWorkoutService.fetchEditWorkoutDetails(id).subscribe(editDetails => this.editDetails = editDetails);
    console.log("Edit details : " + JSON.stringify(this.editDetails));
    this._workoutCategoryService.viewAllCategory().subscribe(viewCategoryForEdit => this.viewCategoryForEdit = viewCategoryForEdit);
>>>>>>> d5236eb7a9283d8022c973773b91c11dc99a2661
  }

  onSelect(args) { 
    debugger
    //console.log("onSelect selectedCategoryId : " + JSON.stringify(args.target.options[0]));
    this.categoryList = null;
        for (var i = 0; i < this.viewCategoryForEdit.length; i++)
        {
          if (this.viewCategoryForEdit[i].categoryName == args.target.options[args.target.selectedIndex].text) {
            this.categoryList = this.viewCategoryForEdit[i];
          }
        }
    }

<<<<<<< HEAD
    onEditWorkoutFormSubmit(): void{
      console.log("edited data: " + JSON.stringify(this.editWorkoutsForm.value));
      this._addWorkoutService.addWorkout(this.editWorkoutsForm.value).subscribe(addedData => this.addWorkout = addedData);
=======
    onEditWorkoutFormSubmit(updateForm : NgForm): void{

      console.log("edited data: " + JSON.stringify(updateForm.value));
      this._addWorkoutService.addWorkout(updateForm).subscribe(addedData => this.addWorkout = addedData);
>>>>>>> d5236eb7a9283d8022c973773b91c11dc99a2661
    }
    

}
