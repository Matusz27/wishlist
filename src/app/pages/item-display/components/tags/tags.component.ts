import { Component, OnInit } from '@angular/core';
import { SteamCallService } from 'src/app/services/steam-call.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {

  topTags!:any;

  constructor(private steamCall: SteamCallService) { }
  

  ngOnInit(): void {
    this.topTags = this.steamCall.tagsCounter()
  }

}
