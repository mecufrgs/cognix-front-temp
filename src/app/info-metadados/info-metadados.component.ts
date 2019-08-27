import { Component, OnInit } from '@angular/core';
import { Metadata, OBAA } from '../metadata';
import { Mock, emptyMockOBAA } from '../mock-data';
import { RestService, endpoint } from '../rest.service';
import { ActivatedRoute } from "@angular/router";
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-info-metadados',
  templateUrl: './info-metadados.component.html',
  styleUrls: ['./info-metadados.component.css']
})


export class InfoMetadadosComponent implements OnInit {


  info: OBAA;
  id = "init";
  documents:any;
  simple:any;
  simples:any;

  thumb: string;
  


  constructor(private route: ActivatedRoute, private rest: RestService, private sanitizer:DomSanitizer) { }


  ngOnInit() {
    
    this.simple = {
      name:"",
      accessibilitylanguage:"",
      public: "",
      description:"",
      accessibility:"",
      context: "",
      education:"",
      area:"",
      interaction:"",
      interactionNumber:"",
      dificulty:"",
      rights:"",
      author:[{
        name: "",
        role:"",
      }],
      keywords:"",
      interactive:"",
      licence:"",
      kind: [],
      target: [],
      age: [],
      resources: [],
      bncc: "",
      owner:"admin",
      favorites:"",
      id:0
    };

    this.info = emptyMockOBAA;
    this.id = this.route.snapshot.paramMap.get('id');
    
    this.rest.getDocumentFromID(this.id).subscribe((data: {}) => {
      Object.assign(this.info,data);
      this.thumb = endpoint  + "/files/" + this.id + "/thumbnail";
    });

    var finalString = "q=id:\""+ this.id + "\"";
    
    this.rest.querySOLR(finalString).subscribe((data: any) => {
      this.documents = data.response.docs;
      console.log(this.documents);
      this.simples = this.documents[0];
      this.simple = {

        name:this.documents[0].name[0],
        language: this.documents[0].language[0],
        //public: this.documents[0].public[0],
        description:this.documents[0].description,
        accessibility:this.documents[0].accessibility,
        context: this.documents[0].context,
        education:this.documents[0].education,
        area:this.documents[0].area,
        interaction:this.documents[0].interaction,
        interactionNumber:this.documents[0].interactionNumber,
        dificulty:this.documents[0].dificulty,
        rights:this.documents[0].rights,
        authors:this.documents[0].author,
        author: [],
        keywords:this.documents[0].keywords,
        //interactive:this.documents[0].interactive[0],
        licence:this.documents[0].licence,
        kind: this.documents[0].kind,
        target: this.documents[0].target,
        age: this.documents[0].age,
        resources: this.documents[0].resources,
        bncc: this.documents[0].bncc[0],
        owner:this.documents[0].owner[0],
        //favorites:this.documents[0].favorites[0],
      }
      console.log(this.simple);
      for(var i = 0; i < this.simple.authors.length; i++){
          var x = this.simple.authors[i];
          var y = x.split(",")
          var z = y[0].split("=")[1];
          var k = y[1].split("=")[1];
          var l = k.substr(0, k.length - 1);

          this.simple.author.push({name:z, role:l});
          
          console.log("L=" + l);
          console.log("Z=" + z);
        }
      
    });

    

  }

  sanitize(){
    return this.sanitizer.bypassSecurityTrustUrl(endpoint + '8080/files/'+ this.id);
}

}
