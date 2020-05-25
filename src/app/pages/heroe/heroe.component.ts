import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, NgForm } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
// servicios
import { IconServiceService } from '../../services/icon-service.service';
import { HeroesService } from '../../services/heroes.service';
// models
import { HeroeModel } from '../../models/heroe.model';
// librerias externas
import Swal from 'sweetalert2';


@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {
  heroe: HeroeModel = new HeroeModel();
  heroeForm: FormGroup;
  constructor(public iconS: IconServiceService, private heroeS: HeroesService, private router: Router,
              private rutaActiva: ActivatedRoute ) {
    this.validaciones(this.heroe);
  }

  ngOnInit(): void {
    const ID = this.rutaActiva.snapshot.paramMap.get('id');

    if ( ID !== 'nuevo'){
      this.heroeS.getHeroe(ID).subscribe((resul: HeroeModel) => {
        this.heroe = resul;
        this.heroe.id =  ID;
        this.validaciones(this.heroe);
      }, (err) => {
        console.log(err);
      });
    }
   }

  setGuardar(form: any) {
    this.asignacion(form);
    this.infoLoading();
    if (this.heroe.id) {
      this.actulizarHeroe(this.heroe);
    } else {
      this.crearHeroe();
    }

  }
  asignacion(form: any) {
    this.heroe.nombre = form.form.value.nombre;
    this.heroe.poder = form.form.value.poder;
  }

  crearHeroe() {
    this.heroeS.setCrearheroe(this.heroe)
      .subscribe((resul) => {
        this.heroe = resul;
        this.validaciones(this.heroe);
        this.resulLoading(this. heroe, 'se ha creado correctemente');
        this.router.navigateByUrl('heroes');
      }, (err) => {
        console.log(err);
      });
  }
  actulizarHeroe(Heroe: HeroeModel) {
    this.heroeS.setActulizarHeroe(Heroe)
      .subscribe((resul) => {
        console.log(resul);
        this.resulLoading(this.heroe, 'se ha actulizado correctamente ');
        this.router.navigateByUrl('heroes');
      }, (err) => {
        console.log(err);
      });
  }
  infoLoading() {
    Swal.fire({
      title: 'Espere un momento',
      text: 'Guardando informacion',
      icon: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();
  }
  resulLoading(heroe: HeroeModel, text: string) {
    Swal.fire ({
      title: heroe.nombre,
      text,
      icon: 'success'
    });
  }
  validaciones(heroe: HeroeModel) {
    this.heroeForm = new FormGroup({
      id: new FormControl({ value: heroe.id, disabled: true }),
      nombre: new FormControl(heroe.nombre, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      poder: new FormControl(heroe.poder, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    });
  }

}
