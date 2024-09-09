import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rate-experience',
  templateUrl: './rate-experience.component.html',
  styleUrls: ['./rate-experience.component.scss']
})
export class RateExperienceComponent implements OnInit {
  show =true;

  constructor() { }

  ngOnInit(): void {
  }
  sendVote(evento:any){
  }
  closeRate(evento:boolean){
    this.show = evento;
  }
  skipRate(resp:boolean){
    console.log(resp);
    this.show = !resp;
  }
  focusInOption(option:boolean){
    console.log('focus',option);
  }
  focusOutOption(option:boolean){
    console.log('focus',option);
  }

}
