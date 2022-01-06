import { Component, OnInit } from '@angular/core';
import { Status } from 'src/app/interfaces/status';
import { SteamCallService } from 'src/app/services/steam-call.service';

@Component({
  selector: 'app-pi-chart',
  templateUrl: './pi-chart.component.html',
  styleUrls: ['./pi-chart.component.scss']
})
export class PiChartComponent implements OnInit {

  itemStatus!: Status;
  itemAmount!: number;

  constructor(private steamCall: SteamCallService) { }

  ngOnInit(): void {
    this.itemAmount = Object.keys(this.steamCall.steamData).length;
    this.itemStatus = this.steamCall.statusCounter()
  }

}
