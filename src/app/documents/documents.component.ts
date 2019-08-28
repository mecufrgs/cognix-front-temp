import { Component, OnInit, Input } from '@angular/core';
import { Metadata, Contribuinte } from '../metadata';
import { Mock, contrib } from '../mock-data';
import {DomSanitizer} from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { endpoint } from '../rest.service';
@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {
@Input() document: {id: any, title:any};
private thumb: String
  

  isLogged: boolean;
  ngOnInit() {
    this.isLogged = true;
    this.thumb = endpoint  + "/files/" + this.document.id + "/thumbnail";

  }



}