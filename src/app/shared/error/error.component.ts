import { ErrorsService } from './../../services/errors.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

  errorMessage:string = "Something Went Wrong"

  constructor(private errorsHanle: ErrorsService) { }

  ngOnInit(): void {
    if (this.errorsHanle.message != ''){
      this.errorMessage = this.errorsHanle.message
    }
  }

}
