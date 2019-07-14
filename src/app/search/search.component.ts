import { Component, OnInit } from '@angular/core';
import { parameters } from './searchParameters'
import { RestService } from '../rest.service'
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchOptions: any;
  finalSearch: string;
  finalparam: string;
  finished:boolean;
  depth:number;
  path:number[];
  searchText:any;

  private documents: object;

  constructor(public rest:RestService) { 

  }

  ngOnInit() {
    this.searchOptions = Object.assign({}, parameters);
    this.finalSearch = "área do conhecimento"; 
    this.finished = false;
    this.depth = 0;
    this.path = [];
    
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
      console.log(this.depth);
    }

    console.log(this.finalSearch);

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

  search(){
    console.log(this.searchText);

    var finalString = "q=title:\""+ this.searchText + "\" AND keywords:\"" + this.finalSearch + "\"";
    this.rest.querySOLR(finalString).subscribe((data: any) => {
      this.documents = data.response.docs;
      console.log(this.documents);
    });

  }


}
