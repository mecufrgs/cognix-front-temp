import { Component, OnInit } from '@angular/core';
import { Metadata, OBAA } from '../metadata';
import { Mock, emptyMockOBAA } from '../mock-data';
import { RestService } from '../rest.service';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-info-metadados',
  templateUrl: './info-metadados.component.html',
  styleUrls: ['./info-metadados.component.css']
})


export class InfoMetadadosComponent implements OnInit {


  info: OBAA;
  id = "init";
  constructor(private route: ActivatedRoute, private rest: RestService) { }
  ngOnInit() {
    this.info = emptyMockOBAA;
    this.id = this.route.snapshot.paramMap.get('id');
    this.rest.getDocumentFromID(this.id).subscribe((data: {}) => {
      Object.assign(this.info,data);
      console.log(this.info);
    });
  }


}
