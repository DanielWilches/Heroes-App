import { Injectable } from '@angular/core';
import {faArrowLeft, faPlus, faSpinner, faExclamation, faSave, faDizzy, faGrin, faPen,  faTrash } from '@fortawesome/free-solid-svg-icons';



@Injectable({
  providedIn: 'root'
})
export class IconServiceService {
  faPlus = faPlus;
  faSpinner =  faSpinner;
  faExclamation = faExclamation;
  faArrowLeft = faArrowLeft ;
  faSave = faSave;
  faGrin = faDizzy;
  faDizzy = faGrin;
  faPen = faPen;
  faTrash = faTrash;
  constructor() { }
}
