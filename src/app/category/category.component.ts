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
  addCategory: Response;//IAddWorkoutCategory[];
  viewAllCategory: IAddWorkoutCategory[];
  deleteCategoryStatus : Response;
  isEditBtnClicked:boolean = false;
  readOnly : number;
  successMessage: string = "";
  errorMessage: string = "";
  constructor(private _workoutCategoryService: WorkoutCategoryService) { }

  ngOnInit() {
    this._workoutCategoryService.viewAllCategory().subscribe(viewAllCategory => this.viewAllCategory = viewAllCategory);
  }

  addWorkoutCategory(addCategoryForm : NgForm):void{
    console.log("addCategoryForm : " + JSON.stringify(addCategoryForm.value));
    this._workoutCategoryService.addCategory(addCategoryForm)
    .subscribe(data =>{
        this.addCategory = data;
        if(this.addCategory.status == 200){
          this.successMessage = "Successfully added the Category";
        }
      },error =>{
        this.errorMessage = "Oops !! Something went wrong";
      }
    );    
    this.viewAllCategory.splice( 1, 0, addCategoryForm.value);
  }

  deleteCategory(category,index){
    console.log("delete category details : " + JSON.stringify(category));
    this._workoutCategoryService.deleteCategory(category)
    .subscribe(data =>{
      this.deleteCategoryStatus = data;
      if(this.deleteCategoryStatus.status == 200){
        console.log("inside delete category");
        this.successMessage = "Successfully deleted the Category";
      }
    },error =>{
      this.errorMessage = "Oops !! Something went wrong";
    });
    console.log("successMessage : "+ this.successMessage);
    this.viewAllCategory.splice(index,1);
  }

   editCategory(category,index,event,textbox){
     debugger
    console.log("viewAllCategory Response : " +  this.viewAllCategory + "category:"+ category);
    category.isEdit = false;
     var target = event.target || event.srcElement || event.currentTarget;
     var idValue = target.value;
     if(idValue == "Edit"){
       this.isEditBtnClicked = true;
       target.value = "Save";
       target.className="btn btn-success";
    }else{
      this.isEditBtnClicked = false;
      target.value = "Edit";
      target.className="btn btn-info";
    }
    console.log("category.isEdit : " + category.isEdit);
    
   }
 
}
