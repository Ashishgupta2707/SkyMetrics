import { computed, Injectable, signal } from '@angular/core';

interface Message  {
  msg: string,
  type : string
}

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private _message = signal<Message | null>(null);
  timeOut: any;

  message = computed(() => this._message());

  show(message: string, type: string, duration: number = 2000) {

    this.clearTimeOut();
    
    this._message.set({ msg : message, type : type });

    this.timeOut = setTimeout(() => {
      this._message.set(null);
      this.timeOut = null;
    }, duration);
  }

  clear() {
    this._message.set(null);
    this.clearTimeOut();
  }

  ngOnDestroy() {
    this.clearTimeOut();
  }

  clearTimeOut() {
    if (this.timeOut) {
      clearTimeout(this.timeOut);
      this.timeOut = null;
    }
  }
}
