import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'lct-rate-experience',
  templateUrl: './rate-experience.component.html',
  styleUrls: ['./rate-experience.component.scss']
})
export class RateExperienceComponent implements OnInit {

  respVote :number =0;
  inputValue = '';
  finallyThanks = false;
  second = 5;
  private intervalId: any;

  @Output() sendVote = new EventEmitter<{ vote: number, commentary: string }>();
  @Output() closeRate = new EventEmitter<boolean>();
  @Input() titleQuestion: string | undefined;


  constructor() { }

  ngOnInit(): void {
  }
  response(voteResp : number){
    if(voteResp >= 0 && voteResp <= 6){
      this.respVote = voteResp;
    }else{
      this.finallyThanks = true;
      this.respVote = voteResp;
      const voteResponse = {
        vote: this.respVote,
        commentary: this.inputValue
      };
      this.intervalId = setInterval(() => {
        if (this.second > 0) {
          this.second--;
        } else {
          this.clearInterval();
        }
      }, 1000);
      setTimeout(() => {
        this.close();
      }, 5000); // Ejecutar close() después de 5 segundos
      this.sendVote.emit(voteResponse);
    }
   

  }
  sendComentary(){
    this.finallyThanks = true;
    const voteResponse = {
      vote: this.respVote,
      commentary: this.inputValue
    };
    this.intervalId = setInterval(() => {
      if (this.second > 0) {
        this.second--;
      } else {
        this.clearInterval();
      }
    }, 1000);
    setTimeout(() => {
      this.close();
    }, 5000); // Ejecutar close() después de 5 segundos
    this.sendVote.emit(voteResponse);
  }


  clearInterval() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  
  close(){
    this.inputValue = '';
    this.finallyThanks = false;
    this.closeRate.emit(false)
  }
  back(){
    this.respVote= 0;
    this.finallyThanks = false;
  }
 
  
}
