import { Component, OnInit } from '@angular/core';
import { parameters } from './searchParameters'
import { restoreBindingIndex } from '@angular/core/src/render3/instructions';
import { RestService } from '../rest.service'
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchOptions: any;
  currentOption: string;
  printedOptions: string[];
  finalSearch: string;
  finished:boolean;

  private documents: object;

  constructor(public rest:RestService) { 

  }

  ngOnInit() {
    this.searchOptions = Object.assign({}, parameters);
    this.currentOption = "área do conhecimento";
    this.finalSearch = "OBAA"; 
    this.finished = false;
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

  search(){
    var finalString = "q=keywords:" + this.finalSearch + "*";
    this.rest.querySOLR(finalString).subscribe((data: any) => {
      this.documents = data.response.docs;
      console.log(this.documents);
    });

  }


}
