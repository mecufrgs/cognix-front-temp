import { Component, OnInit } from '@angular/core';
import { OBAA, OBAACreator } from '../metadata';
import { emptyMockOBAA, emptyMockOBAACreator } from '../mock-data';

import { RestService } from '../rest.service';
import {  FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';
import {Router} from "@angular/router"
@Component({
  selector: 'app-new-document-fast',
  templateUrl: './new-document-fast.component.html',
  styleUrls: ['./new-document-fast.component.css']
})
export class NewDocumentFastComponent implements OnInit {

  constructor(public rest:RestService, private router:Router) { 
    this.rest.getID().subscribe((data: {}) => {
      console.log(data)
      Object.assign(this.OBAA,data);
      console.log(this.OBAA);
      //Todo: make "end" button disappear before the observable completes
    });
    
  }
  OBAA: OBAACreator;
  public uploader: FileUploader = new FileUploader({url: "cognixBack:8080/files", itemAlias: 'thumbnail'});

  ngOnInit() {
    this.OBAA = emptyMockOBAACreator;
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
         console.log('ImageUpload:uploaded:', item, status, response);
     };
  
  }

  finish(){
    console.log( "BEFORE");
    console.log(this.OBAA);
    this.OBAA.isVersion = "1";
    this.rest.addDocument(JSON.stringify(this.OBAA), this.OBAA.id).subscribe((data: {}) => {
      console.log(data);
      this.router.navigate(['/']);
    });
    
  }



}
