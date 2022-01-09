import { Component, Input, OnInit } from '@angular/core';
import { Prices } from 'src/app/interfaces/prices';
import { SteamCallService } from 'src/app/services/steam-call.service';

@Component({
  selector: 'app-breakdown',
  templateUrl: './breakdown.component.html',
  styleUrls: ['./breakdown.component.scss']
})
export class BreakdownComponent implements OnInit {

  @Input() amount: number = 0;
  sum!: Prices;
  currencyCode: string = "";

  constructor(private steamCall: SteamCallService) { }

  async ngOnInit(){

    this.sum = this.steamCall.sumGames(this.amount)
    
    this.currencyCode = this.steamCall.selectedCurrency

    if (this.currencyCode === ""){
      this.currencyCode = await this.steamCall.getCurrency()
    }
  }

}
