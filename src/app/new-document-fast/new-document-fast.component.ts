import { Component, OnInit } from '@angular/core';
import { OBAA, OBAACreator } from '../metadata';
import { emptyMockOBAA, emptyMockOBAACreator } from '../mock-data';

import { RestService } from '../rest.service';
import {  FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';
import {Router} from "@angular/router"
import { parameters } from '../search/searchParameters';
@Component({
  selector: 'app-new-document-fast',
  templateUrl: './new-document-fast.component.html',
  styleUrls: ['./new-document-fast.component.css']
})
export class NewDocumentFastComponent implements OnInit {

  searchOptions: any;
  currentOption: string;
  printedOptions: string[];
  finalSearch: string;
  finished:boolean;



  constructor(public rest:RestService, private router:Router) { 
    this.rest.getID().subscribe((data: {}) => {
      console.log(data)
      Object.assign(this.OBAA,data);
      console.log(this.OBAA);
      //Todo: make "end" button disappear before the observable completes
    });
    
  }
  OBAA: OBAACreator;
  public uploader: FileUploader = new FileUploader({url: "cognixBack:8080/files/uploadFile", itemAlias: 'thumbnail'});

  ngOnInit() {
    this.OBAA = emptyMockOBAACreator;
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
         console.log('ImageUpload:uploaded:', item, status, response);
     };


     this.searchOptions = Object.assign({}, parameters);
     this.currentOption = "área do conhecimento";
     this.finalSearch = "OBAA"; 
     this.finished = false;
  
  }

  finish(){
    console.log( "BEFORE");
    this.OBAA.metadata.general.keywords.push(this.finalSearch);
    console.log(this.OBAA);

    var simple = [{
      id:this.OBAA.id,
      keywords:this.OBAA.metadata.general.keywords,
      title:this.OBAA.metadata.general.titles[0],
    }];

    this.OBAA.isVersion = "1";
    this.rest.addDocument(JSON.stringify(this.OBAA), this.OBAA.id).subscribe((data: {}) => {
      console.log(data);
      this.router.navigate(['/']);
    });

    console.log("HERE");

    this.rest.addDocumentSOLR(JSON.stringify(simple)).subscribe((data: {}) => {
      console.log(data);
      this.router.navigate(['/']);
    });
    
  }

  onSelect(index:number, selected:string){
    
    if(!this.finished){

      

      this.finalSearch += "."+ selected;
        
      if(this.searchOptions.hasOwnProperty("params")){
        this.searchOptions = this.searchOptions.params[index];
        this.currentOption = selected;
      } else this.finished = true;
        
        
      

    }
    //Todo: End result must be changeable.


  }


}
