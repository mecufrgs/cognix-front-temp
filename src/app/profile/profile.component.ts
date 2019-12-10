import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private rest: RestService, private router: Router) { }

  ngOnInit() {
  }

  logoutUser(){
    if (confirm("Are you sure you want to logout?")) {
    this.rest.logged.emit(false)
    this.router.navigate([''])
    }
  }

}
