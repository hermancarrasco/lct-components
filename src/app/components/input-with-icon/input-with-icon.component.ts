import { Component, OnInit } from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-input-with-icon',
  templateUrl: './input-with-icon.component.html',
  styleUrls: ['./input-with-icon.component.scss']
})
export class InputWithIconComponent implements OnInit {

  value1= new FormControl('');
  constructor() {
  }

  ngOnInit(): void {
  }

  clickEnIcon() {
    console.log('click icon: ')
  }

  enter(value: string) {
    console.log('enter gatillado: ', value);
  }
  modelChange(ev: any) {
    console.log('model change:', ev);
  }
  inputClick() {
    console.log('click en input');
  }

}
