import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// modelos de datos 
import { HeroeModel } from '../models/heroe.model';

// operadores de rxjs
import { map } from 'rxjs/operators';
import { __classPrivateFieldGet } from 'tslib';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {
  private url = `https://login-app-252e3.firebaseio.com`;

  constructor(private http: HttpClient) { }

  setCrearheroe(heroe: HeroeModel) {
    return this.http.post(`${this.url}/heroes.json`, heroe)
      .pipe(
        map((resul: any) => {
          console.log(resul);
          heroe.id = resul.name;
          return heroe;
        }, (err: any) => {
          console.log(err);
        })
      );
  }
  // /heroes.json
  setActulizarHeroe(heroe: HeroeModel) {
    const heroeTemp = {
      ...heroe
    };
    delete heroeTemp.id;
    return this.http.put(`${this.url}/heroes/${heroe.id}.json`, heroeTemp);
  }

  getHeroes() {
    return this.http.get(`${this.url}/heroes.json`)
      .pipe(
        map(resul => this.crearArreglo(resul)));
  }
  // https://login-app-252e3.firebaseio.com/heroes/-M7xJYzExzDLTtefKOjf
  getHeroe(id: string) {
    return this.http.get(`${this.url}/heroes/${id}.json`);
  }

  borrarHeroe(id: string){
    return this.http.delete(`${this.url}/heroes/${id}.json`);
  }


  private crearArreglo(heroesObj: object) {
    if (heroesObj === null) { return []; }
    const HEROES: HeroeModel[] = [];
    Object.keys(heroesObj).forEach(key => {
      const heroe: HeroeModel = heroesObj[key];
      heroe.id = key;
      HEROES.push(heroe);
    });
    return HEROES;
  }

}
