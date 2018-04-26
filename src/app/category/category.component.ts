import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IAddWorkoutCategory } from './workout-category';
import { IViewWorkoutCategory } from './workout-category-view';
import { WorkoutCategoryService } from './workout-category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  providers: [WorkoutCategoryService]
})
export class CategoryComponent implements OnInit {
  addCategory: IAddWorkoutCategory[];
  viewAllCategory: IAddWorkoutCategory[];
  deleteCategoryStatus : string;
  constructor(private _workoutCategoryService: WorkoutCategoryService) { }

  ngOnInit() {
    this._workoutCategoryService.viewAllCategory().subscribe(viewAllCategory => this.viewAllCategory = viewAllCategory);
  }

  addWorkoutCategory(addCategoryForm : NgForm):void{
    console.log("addCategoryForm : " + JSON.stringify(addCategoryForm.value));
    this._workoutCategoryService.addCategory(addCategoryForm).subscribe(addedCategory => this.addCategory = addedCategory);
    console.log("addCategory Response : " + this.addCategory);
    this.viewAllCategory.splice( 1, 0, addCategoryForm.value);
  }

  deleteCategory(category,index){
    console.log("delete category details : " + JSON.stringify(category));
    this._workoutCategoryService.deleteCategory(category).subscribe(deleteCategoryStatus => this.deleteCategoryStatus = deleteCategoryStatus);
    console.log("delete category status: "+ this.deleteCategoryStatus);
    this.viewAllCategory.splice(index,1);
  }

 
}
