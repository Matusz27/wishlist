import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor(private http: HttpClient) {}

  selectedCurrency:string = "";
  selectedCountry:string = "";


  async getCurrency():Promise<string>{
    let url = 'http://ipwhois.app/json/'
    let currency = await this.http.get<any>(url, {responseType: "json"}).toPromise()
    return currency.currency_code
  }

  setCurrency(currency:string){
    if (currency === ""){
      return
    }
    let SplitedCurrency = currency.split(',', 2)
    this.selectedCountry = SplitedCurrency[0]
    this.selectedCurrency = SplitedCurrency[1]
  }
}
