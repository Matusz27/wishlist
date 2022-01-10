import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ErrorsService } from 'src/app/services/errors.service';
import { SteamCallService } from 'src/app/services/steam-call.service';

@Component({
  selector: 'app-item-display',
  templateUrl: './item-display.component.html',
  styleUrls: ['./item-display.component.scss']
})
export class ItemDisplayComponent implements OnInit, OnDestroy {

  id!: number;
  isFinished:boolean = false;
  isError:boolean = false;
  private errorRise: Subscription = new Subscription;

  constructor( private steamCall: SteamCallService, 
    private errorHandle: ErrorsService) {

  }

  async ngOnInit() {


    this.errorRise = this.errorHandle.onChange().subscribe(() => 
        this.isError = this.errorHandle.isError
      )

    await this.steamCall.fetchSteamData()

    this.isFinished = true

  }

  ngOnDestroy() {
    this.errorRise.unsubscribe();
  }
}