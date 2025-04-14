import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'labelPipe'
})
export class LabelPipe implements PipeTransform {
  transform(value: string): string {
    const isMobile = window.innerWidth < 576;
    if(isMobile && value?.length>32)return value?.substring(0,32)+'...';
    if(value?.length>34)return value?.substring(0,34)+'...';
    return value;
  }
}
