import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataInputService {

  constructor() { }

    checkIfUrl(url:string){
    let validUrl = true;
    try {
      new URL(url)
    } catch {
      validUrl = false;
    }
    return validUrl
  }

  inputCleaner(userInput:string){

    let isValidUrl = this.checkIfUrl(userInput);

    if (!isValidUrl){
      return userInput
    }

    console.log

    return(1)
  }
}
