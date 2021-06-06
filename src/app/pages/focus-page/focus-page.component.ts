import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-focus-page',
  templateUrl: './focus-page.component.html',
  styleUrls: ['./focus-page.component.css']
})
export class FocusPageComponent implements OnInit {
  public timer: number;
  public started: boolean;
  private countInterval: any;
  public minutes: string;
  public seconds: string;

  constructor() {
    this.timer = 1500;
    this.started = false;
    this.minutes = '25';
    this.seconds = '00';
    this.countInterval = null;
  }

  ngOnInit(): void {
  }

  startTimer() {
    if (!this.started) {
      this.started = !this.started;
      this.countInterval = setInterval(this._controls, 1000);
    } else {
      this.started = !this.started;
      clearInterval(this.countInterval);
    }
  }

  private _controls = () => {
    this.timer = this.timer - 1;
    let minute = Math.floor(this.timer / 60);
    let second = Math.floor(this.timer % 60);
    this.minutes = minute.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
    this.seconds = second.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
  }

}
