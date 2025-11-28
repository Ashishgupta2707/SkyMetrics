import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { env } from '../../enviroments/environment';

@Injectable({
  providedIn: 'root',
})
export class Fetcher {

  SERVER_URL:string = env.SERVER_URL;
  Node_URL:string = env.NodeURL;

  private http: HttpClient = inject(HttpClient);

  get(apiUrl:string, parameter:any , header:any, isFullUrl: boolean = true): Observable<any>{
    const url = this.constructUrl(apiUrl, isFullUrl);
    return this.http.get(url, { headers: header ,params : parameter });
  }

  post(apiUrl:string, request:any, header:any , isFullUrl: boolean = false){
    const url = this.constructUrl(apiUrl, isFullUrl);
    return this.http.post(url,request,{headers: header});
  }

  constructUrl(apiUrl:string, isFullUrl:boolean): string{
    const baseUrl = this.SERVER_URL;
    if(isFullUrl){
      return `${baseUrl}${apiUrl}`;
    }
    return `${baseUrl}home/${apiUrl}`;
  }
}
