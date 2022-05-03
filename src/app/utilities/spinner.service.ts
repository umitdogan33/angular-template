import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  constructor(private spinner:NgxSpinnerService) { }

  showSpinner(spinnerNameType: SpinnerType) {
    this.spinner.show(spinnerNameType);
  }

  showSpinnerWithTimeout(spinnerNameType: SpinnerType,timeOut?:number) {
    this.spinner.show(spinnerNameType);

    setTimeout(() => this.hideSpinner(spinnerNameType), timeOut||1000);
  }

  hideSpinner(spinnerNameType: SpinnerType) {
    this.spinner.hide(spinnerNameType);
  }
}
export enum SpinnerType {
  BallAtom = "s1",
  BallScaleMultiple = "s2",
  BallSpinClockwiseFadeRotating = "s3",
  BallPulse = "s4"
}