import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeroesComponent } from './pages/heroes/heroes.component';
import { HeroeComponent } from './pages/heroe/heroe.component';


const routes: Routes = [
  {path: 'heroes', component: HeroesComponent},
  // la ruta heroe eniva un parametro por la direccion url
  {path : 'heroe/:id', component: HeroeComponent},
  // {path: 'heroe', component: HeroeComponent},
  {path: '**', pathMatch: 'full', redirectTo: 'heroes'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
