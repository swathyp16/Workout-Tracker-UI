import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categorySearch'
})
export class CategorySearchPipe implements PipeTransform {

  transform(viewAllCategory: any, categorySearchText?: any): any {
    if(categorySearchText === undefined){
      return viewAllCategory;
    }

    return viewAllCategory.filter(function(data){
      return data.categoryName.toLowerCase().includes(categorySearchText.toLowerCase());
    });
  }

}
