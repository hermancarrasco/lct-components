import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'lct-rate-experience',
  templateUrl: './rate-experience.component.html',
  styleUrls: ['./rate-experience.component.scss']
})
export class RateExperienceComponent implements OnInit {

  respVote :number | undefined ;
  inputValue = '';
  finallyThanks = false;
  second = 5;
  private intervalId: any;

  @Output() sendVote = new EventEmitter<{ vote: number, commentary: string }>();
  @Output() closeRate = new EventEmitter<boolean>();
  @Output() skip = new EventEmitter<boolean>();
  @Input() titleQuestion: string | undefined;

  @Output() focusInOption = new EventEmitter<boolean>();
  @Output() focusOutOption = new EventEmitter<boolean>();


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
        this.close(true);
      }, 5000); // Ejecutar close() después de 5 segundos
      this.sendVote.emit(voteResponse);
    }
   

  }
  sendComentary(){
    if(this.respVote===null || this.respVote === undefined){
      return;
    }
    this.finallyThanks = true;
    const voteResponse = {
      vote: this.respVote,
      commentary: this.inputValue,
      finallythanks : true
    };
    this.intervalId = setInterval(() => {
      if (this.second > 0) {
        this.second--;
      } else {
        this.clearInterval();
        this.close(true);
      }
    }, 800);
    setTimeout(() => {
      this.skipRate();
    }, 5000); // Ejecutar close() después de 5 segundos
      this.sendVote.emit(voteResponse);
  }


  clearInterval() {
    if (this.intervalId) {
      this.respVote= undefined;
      clearInterval(this.intervalId);
    }
  }
  skipRate(){
    this.respVote =undefined;
    this.inputValue = '';
    this.finallyThanks = false;
    this.skip.emit(true)
  }
  
  close(option?:boolean){
   let closeOption = false;
   if(option){
      closeOption = option;
    }
    this.inputValue = '';
    this.finallyThanks = false;
    this.closeRate.emit(closeOption)
  }
  back(){
    this.respVote= undefined;
    this.finallyThanks = false;
  }

  onClick() {
    this.focusInOption.emit(true);
  
  }

  onFocusOut() {
    this.focusOutOption.emit(false);
   
  }
 
  
}
