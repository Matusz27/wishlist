import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Prices } from '../interfaces/prices';
import { Status } from '../interfaces/status';
import { CurrencyService } from './currency.service';
import { ErrorsService } from './errors.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SteamCallService {
  
  
  private Subject = new Subject();

  all_tags!: { [key: string]: number; };
  currentStatus:string = "";
  steamData:{} = {};
  

  constructor(private http: HttpClient, 
    private Currency: CurrencyService, 
    private errorHandle: ErrorsService,
    private router: Router) {}



  changeStatus(status:string){
    this.currentStatus = status
    this.Subject.next()
  }

  async fetchSteamData(){

    let currentUrl = this.router.url.split('/')
  
    let url = `/api/${currentUrl[1]}/wishlistdata`

    for (let page = 0; page < 1; page++) {
        //150
        let query = {'p': page, 'cc': this.Currency.selectedCountry}
        let steamCall
        
        try{
          steamCall = await this.http.get<any>(url, {params: query, responseType: "json"}).toPromise()
          console.log(steamCall)
        }
        catch(error){
          this.errorHandle.riseError(error)
          console.log(error)
          return;
        }
        
      this.currentStatus = `Loading page ${page + 1}`
      this.Subject.next()

        if (steamCall.length === 0) break

        this.steamData = {
          ...this.steamData, 
          ...steamCall
        }
      }
  }

  sumItems(itemstosum:any){

    return (itemstosum.reduce((acc:Prices, item:any) => {
      let cleanedData = new priceDataCleaner(item.subs)
      acc.cleanPrice += cleanedData.fullprice
      acc.discountPrice += cleanedData.discountprice
      acc.discountSum += cleanedData.discount
      acc.discountedCount += cleanedData.isDiscounted
      return (acc)
    }, {cleanPrice: 0, discountPrice: 0, discountSum: 0, discountedCount: 0}))
  }

  sumGames(amount:number){
    let items = Object.values(this.steamData)

    if (amount != 0){
      items = items.filter((item:any) => item.priority <= amount && item.priority != 0 )
    }

    let sumedItems = this.sumItems(items)

    sumedItems.cleanPrice /= 100
    sumedItems.discountPrice /= 100
    sumedItems.averageDiscount = 0

    if (sumedItems.discountedCount != 0){
      sumedItems.averageDiscount = (sumedItems.discountSum / sumedItems.discountedCount) / 100
    }

    if (amount === 0){
      sumedItems.averagePrice = sumedItems.cleanPrice / Object.keys(this.steamData).length
    }
    else{
      sumedItems.averagePrice = sumedItems.cleanPrice / amount
    }
    

    return (sumedItems)
  }

  tagsCounter(){
    this.all_tags = (Object.values(this.steamData).reduce((acc:{[key:string]:number}, item:any) => {
      item.tags.forEach((tag:string)=>{
        if (tag in acc) acc[tag] += 1
        else acc[tag] = 1})
      return (acc)
    }, {}))
    
    let tags = this.all_tags

    let array_tags = Object.keys(tags).map(function(key) {
      return [key, tags[key]];
    });
    
    array_tags.sort(function(first:any, second:any) {
      return second[1] - first[1];
    });
    return Object.values(array_tags.slice(0, 15))
  }

    statusCounter(){
    return (Object.values(this.steamData).reduce((acc:Status, item:any) => {

      if ("prerelease" in item){
        if(item.subs.length != 0){
          acc.preorder += 1
          return acc
        }
        acc.comingsoon += 1
        return acc
      }
      if (item.is_free_game){
        acc.free += 1
        return acc
      }
      if(item.subs.length != 0){
        if(item.subs[0].discount_pct != 0){
          acc.discounted += 1
          return acc
        }
      }
      acc.normal += 1
      return acc
    }, 
    {comingsoon: 0, free: 0, preorder: 0,discounted: 0, normal:0}))
  }

  onChange(): Observable<any>{
    return this.Subject.asObservable();
  }

}

class priceDataCleaner {

  fullprice:number = 0
  discountprice:number = 0
  discount:number = 0
  isDiscounted:number = 0
  
  constructor(pricelist:any){

    if (pricelist.length != 0){
        let subs = pricelist[0]
        this.fullprice = subs['price']
        this.discountprice = this.fullprice
        this.discount = subs['discount_pct']
    }

    if (this.discount != 0){
        this.discountprice = this.fullprice
        this.isDiscounted = 1
        this.fullprice = Math.round(this.discountprice / (1 - (this.discount / 100)))
    }
  }
}