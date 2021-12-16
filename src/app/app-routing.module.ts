import { LandingComponent } from './pages/landing/landing.component';
import { ItemDisplayComponent } from './pages/item-display/item-display.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', component:LandingComponent},
  {path: ':id', component:ItemDisplayComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
