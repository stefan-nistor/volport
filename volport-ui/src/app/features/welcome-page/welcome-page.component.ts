import { Component } from '@angular/core';
import {Tile} from "../../core/models/tile.model";

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent {
  welcomePageText = `Welcome to Volport\n Here you can see the courses, labs, homeworks and your grades!
  This course has credits. Final grade formula is !`;
  tiles: Tile[] = [
    {text: this.welcomePageText, cols: 2, rows: 4},
    {text: '', cols: 2, rows: 1},
    {text: '', cols: 2, rows: 4},
  ];

}
