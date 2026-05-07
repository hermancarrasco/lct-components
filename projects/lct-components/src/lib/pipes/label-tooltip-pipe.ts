import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'labelTooltip',
  standalone: false
})
export class LabelTooltipPipe implements PipeTransform {

 transform(value: string | null | undefined, mode: 'text' | 'title' = 'text'): string | null {
    const text = value ?? '';
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 576;
    const maxLength = isMobile ? 32 : 34;
    const shouldTruncate = text.length > maxLength;

    if (mode === 'title') {
      return shouldTruncate ? text : null;
    }

    if (!shouldTruncate) {
      return text;
    }

    return text.substring(0, maxLength) + '...';
  }
}
