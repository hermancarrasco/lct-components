import {AfterViewInit, Component, ElementRef, Input, OnInit, Renderer2, TemplateRef, ViewChild} from '@angular/core';

@Component({
  selector: 'lct-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss']
})
export class TooltipComponent implements OnInit, AfterViewInit{

  message: string = 'insert text Tooltip';
  secondaryMessage: string = '';
  classes: string = 'top primary';
  marginBottom: string = '';
  @ViewChild('tooltipContainer') tooltipContainer: ElementRef | undefined;

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
  }
  ngAfterViewInit() {
     if (this.marginBottom && this.classes.includes('top')) {
       this.renderer.setStyle(this.tooltipContainer?.nativeElement, 'bottom', this.marginBottom);
     }
   }

}
