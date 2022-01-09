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
      return [userInput, true]
    }
    
    let urlBrokenDown = userInput.split('/')
    
    let idIndex = urlBrokenDown.findIndex((urlPart) => urlPart === "profiles")

    if (idIndex === -1) {
      return ( [0 , false])
    }

    return([urlBrokenDown[idIndex + 1], true])
  }
}
