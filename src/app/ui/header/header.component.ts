import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/rest.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLogged: boolean;
  constructor(public rest : RestService) { }

  ngOnInit() {
    this.isLogged = this.rest.logged;
  }

}
