import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { SteamCallService } from 'src/app/services/steam-call.service';

@Component({
  selector: 'app-item-display',
  templateUrl: './item-display.component.html',
  styleUrls: ['./item-display.component.scss']
})
export class ItemDisplayComponent implements OnInit, OnDestroy {

  id!: number;
  isFinished:boolean = false;
  private urlsub: Subscription = new Subscription;

  constructor(private route: ActivatedRoute, private steamCall: SteamCallService) {

  }

  async ngOnInit() {

    this.urlsub = this.route.params.subscribe(params => {
       this.id = params.id;
    });
    
    await this.steamCall.fetchSteamData(this.id)

    this.isFinished = true

  }

  ngOnDestroy() {
    this.urlsub.unsubscribe();
  }
}