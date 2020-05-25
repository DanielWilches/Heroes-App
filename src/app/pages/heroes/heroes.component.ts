import { Component, OnInit } from '@angular/core';
// servicios
import { IconServiceService } from '../../services/icon-service.service';
import { HeroesService } from '../../services/heroes.service';
import { HeroeModel } from '../../models/heroe.model';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: HeroeModel[] = [];
  cargando: boolean;
  constructor( public iconS: IconServiceService, private heroeS: HeroesService ) {
  }

  ngOnInit(): void {
    this.cargando = true;
    this.getHeroes();
  }
  borrarheroe(  heroe: HeroeModel, index: number ) {

    Swal.fire({
      title: '¿Está seguro?',
      text: `Esta seguro que desea borrar a ${heroe.nombre}`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then(resp => {
      if (resp.value){
        this.heroes.splice(index, 1);
        this.heroeS.borrarHeroe(heroe.id).subscribe();
      }
    });
  }
  getHeroes( ) {
    this.heroeS.getHeroes()
    .subscribe((resul) => {
      this.heroes = resul;
      this.cargando = false;
    }, (err) => {
      console.log(err);
    });
  }

}
