import {Component, Input, OnInit, TemplateRef} from '@angular/core';

@Component({
  selector: 'lct-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss']
})
export class TooltipComponent implements OnInit {

  message: string = 'insert text Tooltip';
  secondaryMessage: string = '';
  classes: string = 'top primary';

  constructor() { }

  ngOnInit(): void {
  }

}
