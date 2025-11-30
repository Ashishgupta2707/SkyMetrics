import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoaderSrv {
  private _message = signal<string | null>(null);
  private _isLoading =signal<boolean>(false);

  public message = computed(()=> this._message());
  public isLoading = computed(()=> this._isLoading());

  show(msg:string = "Loading..." ){
    this._message.set(msg);
    this._isLoading.set(true);
  }

  hide(){
    this._message.set(null);
    this._isLoading.set(false);
  }

  toogle(msg: string="Loading...", hide:boolean){
    if(hide){
      this.hide();
    }else{
      this.show(msg);
    }
  }
}
