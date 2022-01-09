import { Component, OnInit } from '@angular/core';
import { Status } from 'src/app/interfaces/status';
import { SteamCallService } from 'src/app/services/steam-call.service';

@Component({
  selector: 'app-pi-chart',
  templateUrl: './pi-chart.component.html',
  styleUrls: ['./pi-chart.component.scss']
})
export class PiChartComponent implements OnInit {

  itemAmount!: number;
  chartData!:Array<{name:string, value:number, color:string}>
  colorSheme:any = {domain:[]}


  constructor(private steamCall: SteamCallService) { }

  ngOnInit(): void {
    this.itemAmount = Object.keys(this.steamCall.steamData).length;
    this.chartData = dataTrans(this.steamCall.statusCounter())
    this.chartData.forEach(color => {
      this.colorSheme.domain.push(color.color)
    });
  }

  
  newColor(color:any, id:any){
  this.colorSheme.domain[id] = color;
  this.chartData = [...this.chartData]
  };

}



function dataTrans(statusData: Status){
  return [
    {
      "name": "Free",
      "value": statusData.free,
      "color": "#00972A"
    },
    {
      "name": "Incoming",
      "value": statusData.comingsoon,
      "color": "#BF0000"
    },
    {
      "name": "Pre-order",
      "value": statusData.preorder,
      "color": "#81BCE6"
    },
    {
      "name": "Discounted",
      "value": statusData.discounted,
      "color": "#F9D100"
    },
    {
      "name": "Normal",
      "value": statusData.normal,
      "color": "#005FA4"
    }
  ]
}  