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
import { NgForm } from '@angular/forms';
import { IAddWorkout } from '../create-workout/create-workout';

@Component({
  selector: 'app-edit-workout',
  templateUrl: './edit-workout.component.html',
  styleUrls: ['./edit-workout.component.css'],
  providers: [EditWorkoutService,WorkoutCategoryService,AddWorkoutService]
})
export class EditWorkoutComponent implements OnInit {
  editDetails: IEditWorkout;
  viewCategoryForEdit: IAddWorkoutCategory[];
  categoryList:IAddWorkoutCategory = new IAddWorkoutCategory();
  addWorkout: IAddWorkout[];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _editWorkoutService: EditWorkoutService,
    private _workoutCategoryService: WorkoutCategoryService,
    private _addWorkoutService: AddWorkoutService
  ) {}

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    console.log("<-----------ID ------------->" + id);
    this._editWorkoutService.fetchEditWorkoutDetails(id).subscribe(editDetails => this.editDetails = editDetails);
    console.log("Edit details : " + JSON.stringify(this.editDetails));
    this._workoutCategoryService.viewAllCategory().subscribe(viewCategoryForEdit => this.viewCategoryForEdit = viewCategoryForEdit);
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

    onEditWorkoutFormSubmit(updateForm : NgForm): void{

      console.log("edited data: " + JSON.stringify(updateForm.value));
      this._addWorkoutService.addWorkout(updateForm).subscribe(addedData => this.addWorkout = addedData);
    }
    

}
