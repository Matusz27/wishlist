import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SteamCallService } from 'src/app/services/steam-call.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  status: string = 'Warming up'; 
  private steamSubscription: Subscription = new Subscription;

  constructor(private steamCall: SteamCallService) { }

  ngOnInit(): void {

  this.steamSubscription = this.steamCall.onChange().subscribe(() => {
      this.status = this.steamCall.currentStatus;
    });
  }
  
  ngOnDestroy() {
    this.steamSubscription.unsubscribe()
  }

}
