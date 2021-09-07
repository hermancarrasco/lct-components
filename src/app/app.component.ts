import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'designComponents';
  valuesSelect = ['Seleccione una opción', 'Chilexpress', 'Bluex'];
  valuesSelect2 = ['RLO', 'ASD'];

  clickEnIcon() {
    console.log('click icon: ')
  }
  clickButton(){
    console.log('click in button')
  }

  enter(value: string) {
    console.log('enter gatillado: ', value);
  }

  changeSelect(value: string) {
    console.log('value change select: ', value)
  }
}
