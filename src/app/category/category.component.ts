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
  addCategory: Response;
  viewAllCategory: IAddWorkoutCategory[];
  deleteCategoryStatus : Response;
  isEditBtnClicked:boolean = false;
  readOnly : number;
  successMessage: string = "";
  errorMessage: string = "";
  categoryName: string;
  constructor(private _workoutCategoryService: WorkoutCategoryService) { }

  ngOnInit() {
    this._workoutCategoryService.viewAllCategory()
    .subscribe(data => {
      this.viewAllCategory = data; 
    });
  }

  addWorkoutCategory(addCategoryForm : NgForm):void{
    this._workoutCategoryService.addCategory(addCategoryForm)
    .subscribe(data =>{
        this.addCategory = data;
        if(this.addCategory.status == 200){
          this.successMessage = "Successfully added the Category";
          this.viewAllCategory.splice( 1, 0, addCategoryForm.value);
        }
      },error =>{
        this.errorMessage = "Oops !! Something went wrong";
      }
    );        
  }

  deleteCategory(category,index){
    this._workoutCategoryService.deleteCategory(category)
    .subscribe(data =>{
      this.deleteCategoryStatus = data;
      if(this.deleteCategoryStatus.status == 200){
        this.successMessage = "Successfully deleted the Category";
        this.viewAllCategory.splice(index,1);
      }
    },error =>{
      this.errorMessage = "Oops !! Something went wrong";
    });    
  }

   editCategory(category,event,index){
    // debugger
     var target = event.target || event.srcElement || event.currentTarget;
     var idValue = target.value;
     if(idValue == "Edit"){
       this.isEditBtnClicked = true;
       target.value = "Save";
       target.className="btn btn-success";
       for(var i= 0 ; i < this.viewAllCategory.length;i++){
        if(this.viewAllCategory[i].categoryName == category.categoryName){
          this.viewAllCategory[i].isEdit = true;
        }
      }
    }else{
      this.isEditBtnClicked = false;
      target.value = "Edit";
      target.className="btn btn-info";
      for(var i= 0 ; i < this.viewAllCategory.length;i++){
        if(this.viewAllCategory[i].categoryName == category.categoryName){
          this.viewAllCategory[i].isEdit = false;
        }
      }
      for(var i=0; i<target.form.length ; i++){
        if(target.form[i].id.includes("category-") && index==target.form[i].id.substring(9,10)){
          this.categoryName = target.form[i].value;
        }        
      }
      category.categoryName = this.categoryName;
      this._workoutCategoryService.editCategory(category)
      .subscribe(data =>{
          this.addCategory = data;
          if(this.addCategory.status == 200){
            this.successMessage = "Successfully edited the Category";
          }
        },error =>{
          this.errorMessage = "Oops !! Something went wrong";
        }
      );  
    }
   }
 
}
