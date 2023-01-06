import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailScreenComponent } from './detail-screen/detail-screen.component';
import { HeroesScreenComponent } from './heroes-screen/heroes-screen.component';

const routes: Routes = [
  { path: '', component: HeroesScreenComponent },
  { path: 'heroes-screen', component: HeroesScreenComponent},
  { path: 'detail-screen/:id', component: DetailScreenComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
