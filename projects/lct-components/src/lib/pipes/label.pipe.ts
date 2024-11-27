import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'labelPipe'
})
export class LabelPipe implements PipeTransform {

  transform(value: string): string {
    if(value.length>28){
        return value.substring(0,27)+'...';
    }
    return value;
  }

}
