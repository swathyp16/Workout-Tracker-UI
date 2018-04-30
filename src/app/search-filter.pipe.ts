import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

   transform(viewAllWorkout: any, searchText?: any): any {
     if(searchText === undefined){
       return viewAllWorkout;
     }

     return viewAllWorkout.filter(function(data){
       return data.workoutTitle.toLowerCase().includes(searchText.toLowerCase());
     });
   }

}
