import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'app-search-box',
  template: `
    <h5>Buscar:</h5>
    <input type="text"
     class="form-control"
     placeholder="buscar gifs..."
     (keyup.enter)="searchTag()"
     #txtTagInput>
  `,
  styleUrl: './search-box.component.css'
})
export class SearchBoxComponent {
  @ViewChild('txtTagInput')
  public tagInput!:ElementRef<HTMLInputElement>;
  constructor(private gifsService:GifsService){

  }
  searchTag():void{
    const newTag=this.tagInput.nativeElement.value;
    console.log(newTag);
    this.gifsService.searcTag(newTag);
    this.tagInput.nativeElement.value='';


  }

}
