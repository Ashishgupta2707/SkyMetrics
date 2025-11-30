import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Notification } from './components/notification/notification';
import { Loader } from './components/loader/loader';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Notification, Loader],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('SkyMetrics');
}
