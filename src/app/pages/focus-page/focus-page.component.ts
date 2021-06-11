import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2'

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
  private previousTime = { minutes: '25', seconds: '00'};
  public formTimers: FormGroup;
  public panelOpenState = true;
  private countPomodoros = 0 ;

  constructor(public authService: AuthService,
    private formBuilder: FormBuilder,
    private notificationService: NotificationsService) {
    this.timer = 1500;
    this.started = false;
    this.minutes = '25';
    this.seconds = '00';
    this.countInterval = null;
    this.formTimers = this.formBuilder.group({
      'minutes': [20],
      'seconds': [0]
    });
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm() {
    this.formTimers = this.formBuilder.group({
      'minutes': ['20'],
      'seconds': ['00']
    });
  }

  timerControls() {
    if (Number(this.minute.value) === 0 && Number(this.second.value) === 0) {
      this.notificationService.error('Error', 'El timer no puede ejecutar dicha acción');
    } else if (!this.started) this._startTimer();
    else this._stopTimer();
  }

  private _startTimer() {
    this.started = !this.started;
    this.countInterval = setInterval(this._controls, 1000);
  }

  private _stopTimer() {
    this.started = !this.started;
    clearInterval(this.countInterval);
  }

  setTime() {
    if (this.formTimers.valid) {
      let minutes = this.minute.value
      let seconds = this.second.value;
      this.previousTime = this.formTimers.value;
      this.timer = (Number(minutes) * 60) + Number(seconds)
      this._timerCalculations();
    }
  }

  private _controls = () => {
    this.timer = this.timer - 1;
    let result = this._timerCalculations();
    if (result === 0) this.finishedTimer();
  }

  private finishedTimer() {
    this._stopTimer();
    this.countPomodoros++;
    if (this.countPomodoros > 2) {
      Swal.fire({
        title: 'Te recomendamos tomarte un pequeño descanso, ¿quieres iniciar un timer de 5 minutos?',
        showDenyButton: true,
        confirmButtonText: `Si`,
        denyButtonText: `No`,
      }).then((result) => {
        if (result.isConfirmed) {
          this.minute.setValue('05');
          this.second.setValue('00');
          this.setTime();
          this.timerControls();
        } else if (result.isDenied) {
          this.notificationService.info('Info', 'Recuerda tomar un pequeño descanso de 15 a 20 minutos por cada dos a tres intervalos de pomodoro');
        }
      });
      this.countPomodoros = 0;
    }
  }

  private _timerCalculations() {
    let minute = Math.floor(this.timer / 60);
    let second = Math.floor(this.timer % 60);
    this.minutes = minute.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
    this.seconds = second.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
    return minute + second;
  }

  togglePanel(status: boolean) {
    this.panelOpenState = status;
  }

  get minute() {
    return this.formTimers.controls['minutes'];
  }

  get second() {
    return this.formTimers.controls['seconds'];
  }

}
