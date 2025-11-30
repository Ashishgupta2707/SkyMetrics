import { Component, inject } from '@angular/core';
import { LoaderSrv } from '../../services/loader/loader-service';

@Component({
  selector: 'app-loader',
  imports: [],
  templateUrl: './loader.html',
  styleUrl: './loader.scss',
})
export class Loader {
  public loaderService = inject(LoaderSrv);
}
