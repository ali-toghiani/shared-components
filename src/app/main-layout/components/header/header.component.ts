import { Component, OnInit, Input } from '@angular/core';
import {HeaderModel} from "../../models/header.model";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() headerConfig: HeaderModel;

  constructor() { }

  ngOnInit(): void {
  }

}
