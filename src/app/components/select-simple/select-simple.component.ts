import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-select-simple',
  templateUrl: './select-simple.component.html',
  styleUrls: ['./select-simple.component.scss']
})
export class SelectSimpleComponent implements OnInit {
  array = ['AAA','BBB']
  constructor() { }
  
  ngOnInit(): void {
  }
  changeSelect(value: string) {
    console.log('value change select: ', value)
  }
  agregar(){
    this.array.push('ASD');
  }

}
