import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-input-simple',
  templateUrl: './input-simple.component.html',
  styleUrls: ['./input-simple.component.scss']
})
export class InputSimpleComponent implements OnInit {
  value1 = '';
  error: boolean = false;
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


  setError() {
    this.error = !this.error;
  }
}
