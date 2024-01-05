import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchboxResponse } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  public gifList:Gif[]=[];


  private _tagsHistory:string[]=[];
  private apiKey:string='tWboreEMYU2Eyogmpnk1av1JR6vTaiWi';
  private serviceUrl=`https://api.giphy.com/v1/gifs/search`;

  constructor(private http:HttpClient) {
    this.LoadHistoryLocalStorage();
    this.searcTag(this._tagsHistory[0]);
   }

  get tagsHistory(){
    return [...this._tagsHistory]
  }
  private organizeHistory(tag:string){
    tag=tag.toLowerCase();

    if(this._tagsHistory.includes(tag)){
      console.log('includes')
      this._tagsHistory=this.tagsHistory.filter((tagElement)=>{
        return tagElement!==tag;

      })
    }
    console.warn(this._tagsHistory);

    this._tagsHistory.unshift(tag);
    this._tagsHistory=this.tagsHistory.splice(0,10);

    this.saveHistoryLocalStorage();
  }
  private saveHistoryLocalStorage():void{
    localStorage.setItem('GifHistory',JSON.stringify(this._tagsHistory));
  }
  private LoadHistoryLocalStorage():void{
    if(!localStorage.getItem('GifHistory'))return;
    this._tagsHistory=JSON.parse(localStorage.getItem('GifHistory')!);
  }

  searcTag(tag:string):void{
    if(tag.length===0) return;

    this.organizeHistory(tag);
    console.warn(tag);

    const params=new HttpParams()
      .set('api_key',this.apiKey)
      .set('limit','10')
      .set('q',tag)

    this.http.get<SearchboxResponse>(`${this.serviceUrl}`,{params}).subscribe(resp=>{
      console.log(resp.data);
      this.gifList=resp.data;
    });


  }
}
