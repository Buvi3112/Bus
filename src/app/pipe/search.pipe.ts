import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(list: any, filterText: string): any {
    //console.log(list);
    //console.log(filterText);
    // let searchFilter: string = filterText ? filterText.toLocaleLowerCase() : null;
    // return searchFilter ? list.filter(product => 
    //   product.Name.toLocaleLowerCase().startsWith(searchFilter) != false): list;
    const result:any[] = [];
    filterText = filterText.toLowerCase();
    if(filterText == "" ){
      return list;
    }else{
      for(var i = 0; i<list.length ; i++){
        let pname:string = list[i].location.toLowerCase();
        console.log(list);
        if(pname.startsWith(filterText)){
          result.push(list[i]);
        }
      }
      return result;
    }
  }

}
