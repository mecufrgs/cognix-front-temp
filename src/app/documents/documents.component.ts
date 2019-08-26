import { Component, OnInit, Input } from '@angular/core';
import { Metadata, Contribuinte } from '../metadata';
import { Mock, contrib } from '../mock-data';
import {DomSanitizer} from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {
@Input() document: {id: any};
private thumb: String
  

  isLogged: boolean;
  ngOnInit() {
    this.isLogged = true;
    this.thumb = "http://localhost:8080/files/" + this.document.id + "/thumbnail";

  }



}