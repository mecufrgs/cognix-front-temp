import { Component, OnInit } from '@angular/core';
import { OBAA, OBAACreator } from '../metadata';
import { emptyMockOBAA, emptyMockOBAACreator } from '../mock-data';

import { RestService } from '../rest.service';
import {  FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';
import {Router} from "@angular/router"
import { parameters } from '../search/searchParameters';
import {MatStepperModule} from '@angular/material/stepper'; 

@Component({
  selector: 'app-new-document-fast',
  templateUrl: './new-document-fast.component.html',
  styleUrls: ['./new-document-fast.component.css']
})
export class NewDocumentFastComponent implements OnInit {

  searchOptions: any;
  finalSearch: string;
  finalparam: string;
  finished:boolean;
  depth:number;
  path:number[];


  kind:any;
  target:any;
  age:any;
  resources:any;

  currentPage: number;
  progressBarValue: number;

  constructor(public rest:RestService, private router:Router) { 
    this.rest.getID().subscribe((data: {}) => {
      //console.log(data)
      Object.assign(this.OBAA,data);
      //console.log(this.OBAA);
      this.uploader.onBuildItemForm = (item, form) => {
        form.append("docId", this.OBAA.id);
        form.append("filename", "thumbnail");
      };

      this.uploader2.onBuildItemForm = (item, form) => {
        form.append("docId", this.OBAA.id);
        form.append("filename", "file");
      };



      //Todo: make "end" button disappear before the observable completes
    });
    
  }
  OBAA: OBAACreator;
  public uploader: FileUploader = new FileUploader({url: "http://localhost:8080/files/uploadFile", itemAlias: 'thumbnail'});
  public uploader2: FileUploader = new FileUploader({url: "http://localhost:8080/files/uploadFile", itemAlias: 'file'});
  ngOnInit() {
    this.currentPage = 1;
    this.progressBarValue = 14.2857142857;
    this.kind = 
    [
      { 
        name: "Visual",
        isValid: false 
      },
      { 
        name: "Auditivo",
        isValid: false 
      },
      { 
        name: "Textual",
        isValid: false 
      },
      { 
        name: "Tátil",
        isValid: false 
      },
      
    ];

    this.target = 
    [
      { 
        name: "Estudante",
        isValid: false 
      },
      { 
        name: "Professor",
        isValid: false 
      },
      { 
        name: "Autor",
        isValid: false 
      },
      { 
        name: "Gestor",
        isValid: false 
      },
      
    ];

    this.age = 
    [
      { 
        name: "Educação infantil",
        isValid: false 
      },
      { 
        name: "Ensino fundamental - anos iniciais",
        isValid: false 
      },
      { 
        name: "Ensino fundamental - anos finais",
        isValid: false 
      },
      { 
        name: "Ensino médio",
        isValid: false 
      },
      { 
        name: "Ensino superior",
        isValid: false 
      },
      


    ];
    
    this.resources = [
      [ { 
        name: "Exercício",
        isValid: false 
      },
      { 
        name: "Tabela",
        isValid: false 
      },
      { 
        name: "Diagrama",
        isValid: false 
      },
      { 
        name: "Experimento",
        isValid: false 
      }  ],
      
      [{ 
        name: "Simulação",
        isValid: false 
      },
      { 
        name: "Aula",
        isValid: false 
      },
      { 
        name: "Figura",
        isValid: false 
      },
      { 
        name: "Prova",
        isValid: false 
      }],
      
      [{ 
        name: "Questionário",
        isValid: false 
      },
      { 
        name: "Texto narrativo",
        isValid: false 
      },
      { 
        name: "Gráfico",
        isValid: false 
      },
      { 
        name: "Enunciado de questão",
        isValid: false 
      }]
      
    ]


    this.OBAA = emptyMockOBAACreator;

    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
         //console.log('ImageUpload:uploaded:', item, status, response);
     };

     this.uploader2.onAfterAddingFile = (file) => { file.withCredentials = false; };
     this.uploader2.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
         //console.log('ImageUpload:uploaded:', item, status, response);
      };

     this.searchOptions = Object.assign({}, parameters);
     this.finalSearch = "área do conhecimento"; 
     this.finished = false;
     this.depth = 0;
     this.path = [];
  
  }

  finish(){
    console.log(this.kind);
    for(var i = 0; i < this.kind.length; i++){
      if(this.kind[i].isValid){
        this.OBAA.metadata.general.coverages.push(this.kind[i].name);
      }
    }

    for(var i = 0; i < this.target.length; i++){
      if(this.target[i].isValid){
        this.OBAA.metadata.technical.formats.push(this.target[i].name);
      }
    }

    for(var i = 0; i < this.age.length; i++){
      if(this.age[i].isValid){
        this.OBAA.metadata.technical.supportedPlatforms.push(this.age[i].name);
      }
    }

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


    this.rest.addDocumentSOLR(JSON.stringify(simple)).subscribe((data: {}) => {
      console.log(data);
      this.router.navigate(['/']);
    });
    
  }

  onSelect(index:number, selected:string){
    
    if (this.finished) {
      this.finalSearch = this.finalSearch.substring(0, this.finalSearch.length - this.finalparam.length - 1);  
    }
    
    this.finalparam = selected;

    if(this.searchOptions.next[index].hasOwnProperty("next")){



      this.finalSearch += "-" + selected;
      this.searchOptions = this.searchOptions.next[index];
      this.depth++;
      this.path.push(index);
      
      this.finished = false;
      

    }
    else{
      this.finalSearch += "-"+ selected;
      this.finished = true;
      //console.log(this.depth);
    }

    //console.log(this.finalSearch);

  }

  onSelectPrevious(){
    if(this.depth > 0){

      
      var x:any = Object.assign({}, parameters);
      this.finalSearch ="área do conhecimento";


      this.depth--;
      for(var i = 0; i < this.depth; i++){
        x = x.next[this.path[i]];
        this.finalSearch += "-" + x.name;
        
      }
      this.path.pop();
      this.searchOptions = x; 
      
      
      
      
      this.finalparam = this.searchOptions.name;
      this.finished = false;
    }


  }

  //Pagination starts here
  page(page: number){
    this.resetPagesBoldness();

    var currentPageString = "page" + this.currentPage;
    var currentPageStep = "step" + this.currentPage;
    document.getElementById(currentPageString).style.fontWeight = "normal";
    document.getElementById(currentPageStep).style.display = "none";

    

    var newPageString = "page" + page;
    var newStepString = "step" + page;
    document.getElementById(newPageString).style.fontWeight = "bold";
    document.getElementById(newStepString).style.display = "block";
    
    this.currentPage = page;
    this.progressBarValue = 14.2857142857 * page;




  }

  resetPagesBoldness(){
    for (var i = 1; i <= 7; i++){
      var pageString = "page" + i;
      document.getElementById(pageString).style.fontWeight = "normal";

    }
  }

  nextPage(){
      console.log(this.currentPage);
    if (this.currentPage != 7){
      this.page(this.currentPage + 1);
    }
  }

  prevPage(){
    if (this.currentPage != 1){
      this.page(this.currentPage - 1);
    }
  }

  formatLabel(value:number | null){
    switch(value){
      case 1:
        return "Nula";
        break;
      case 2:
        return "Baixa";
        break;
      case 3:
        return "Média";
        break;
      case 4:
        return "Alta";
        break;
    
      }
  }


}
