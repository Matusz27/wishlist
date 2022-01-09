import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router'
import { FormBuilder } from '@angular/forms';
import { CurrencyService } from 'src/app/services/currency.service';
import { DataInputService } from 'src/app/services/data-input.service';


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

  constructor(
    private formBuilder: FormBuilder, 
    private router: Router, 
    private currencyservice: CurrencyService,
    private dataClaening: DataInputService) { }

  validLink:boolean = true;

  ngOnInit(): void {
  }

  onSubmit(): void {
    let input = this.wishlistForm.get("steamID")!.value
    let [id, valid] = this.dataClaening.inputCleaner(input)

    if (!valid){
      this.validLink = false
      return
    }

    let currency = this.wishlistForm.get("currency")!.value
    this.currencyservice.setCurrency(currency)

    this.router.navigate([id])
  }

}
