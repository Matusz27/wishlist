import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router'
import { FormBuilder } from '@angular/forms';

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

  constructor(private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    let id = this.wishlistForm.get("steamID")!.value
    this.router.navigate([id])
  }

}
