import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router'
import { FormBuilder } from '@angular/forms';
import { SteamCallService } from 'src/app/services/steam-call.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  wishlistForm = this.formBuilder.group({
    steamID: '',
    currency: ''
  });

  constructor(private formBuilder: FormBuilder, private router: Router, private steamCall: SteamCallService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    let id = this.wishlistForm.get("steamID")!.value
    let currency = this.wishlistForm.get("currency")!.value
    this.steamCall.setCurrency(currency)
    this.router.navigate([id])
  }

}
