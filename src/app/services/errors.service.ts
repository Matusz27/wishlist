import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorsService {

  message: string = "";
  isError:boolean = false

  private Subject = new Subject();

  constructor() {}

  
  riseError(status:any){
    this.isError = true
    if (status.status === 500)
      this.message = "Invalid User ID or Profile is Private "
    this.Subject.next()
  }

  onChange(): Observable<any>{
    return this.Subject.asObservable();
  }

}
