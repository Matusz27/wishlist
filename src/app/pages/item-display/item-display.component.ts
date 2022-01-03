import { Component, OnInit, OnDestroy } from '@angular/core';
import '@angular/common/locales/global/fr'
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { SteamCallService } from 'src/app/services/steam-call.service';
import { Status } from 'src/app/interfaces/status';
import { Prices } from 'src/app/interfaces/prices';

@Component({
  selector: 'app-item-display',
  templateUrl: './item-display.component.html',
  styleUrls: ['./item-display.component.scss']
})
export class ItemDisplayComponent implements OnInit, OnDestroy {

  id!: number;
  isFinished:boolean = false;
  status:string = "Warming up";
  itemStatus!:Status;
  sumAll!: Prices
  sum10!: Prices
  sum100!: Prices
  itemAmount:number = 0
  topTags!:any;
  currencyCode!:string;
  private urlsub: Subscription = new Subscription;
  private steamSubscription: Subscription = new Subscription;

  constructor(private route: ActivatedRoute, private steamCall: SteamCallService) {

  }

  async ngOnInit() {

    this.urlsub = this.route.params.subscribe(params => {
       this.id = params.id;
    });

    this.steamSubscription = this.steamCall.onChange().subscribe(() => {
      this.status = this.steamCall.currentStatus;
    });
  
    this.steamCall.changeStatus("Calling Steam")
    
    await this.steamCall.fetchSteamData(this.id)

    this.steamCall.changeStatus("Analysing Data")

    this.currencyCode = this.steamCall.selectedCurrency

    if (this.currencyCode === ""){
      this.currencyCode = await this.steamCall.getCurrency()
    }

    this.itemAmount = Object.keys(this.steamCall.steamData).length;
    
    this.sumAll = this.steamCall.sumGames()
    this.sum10 = this.steamCall.sumGames(10)
    this.sum100 = this.steamCall.sumGames(100)

    this.topTags = this.steamCall.tagsCounter()

    this.itemStatus = this.steamCall.statusCounter()

    this.isFinished = true

  }

  ngOnDestroy() {
    this.urlsub.unsubscribe();
    this.steamSubscription.unsubscribe()
  }
}