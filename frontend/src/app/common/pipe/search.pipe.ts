import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(items: any[], searchTerm: string, fields: string[]): any[] {
    if (!items || !searchTerm || !fields || fields.length === 0) {
      return items;
    }
    
    searchTerm = searchTerm.toLowerCase();

    return items.filter(item => {
      for (let field of fields) {
        if (item[field] && typeof item[field] === 'string' &&  item[field].toLowerCase().includes(searchTerm)) {
          return true;
        }
      }
      return false;
    });
  }
}
