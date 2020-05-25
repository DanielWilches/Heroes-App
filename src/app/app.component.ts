import { Component } from '@angular/core';
import { IconServiceService } from './services/icon-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public  iconS: IconServiceService ) {}
}
