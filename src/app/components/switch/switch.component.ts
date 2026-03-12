import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss'],
  standalone: false
})
export class SwitchComponent implements OnInit {
  switchValue = false;

  constructor() { }

  ngOnInit(): void {
  }

}
