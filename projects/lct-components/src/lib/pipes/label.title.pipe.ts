import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'labelTitlePipe'
})
export class LabelTitlePipe implements PipeTransform {
  transform(value: string): string {
    const isMobile = window.innerWidth < 576;
    if(isMobile && value?.length>26)return value?.substring(0,26)+'...';
    if(value?.length>32)return value?.substring(0,32)+'...';
    return value;
  }

}
