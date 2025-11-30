import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NotificationService } from '../../services/notification/notification-service';
import { Fetcher } from '../../services/fetcher/fetcher';
import { LoaderSrv } from '../../services/loader/loader-service';
import { env } from '../../enviroments/environment';

@Component({
  selector: 'app-weather',
  imports: [FormsModule],
  templateUrl: './weather.html',
  styleUrl: './weather.scss',
})
export class Weather implements OnInit {
  private notify: NotificationService = inject(NotificationService);
  private fetcher: Fetcher = inject(Fetcher);
  private loader: LoaderSrv = inject(LoaderSrv);

  isCelsius = true;
  location = '';
  currentDate = '11/26/2025';
  currentTemp: string = '79';
  minCurrentTemp: string = '79';
  maxCurrentTemp: string = '79';
  weatherCondition = 'Sunny';

  weatherDetails: any[] = [
    { icon: '🌡️', label: 'Feels Like', value: '82.5°' },
    { icon: '📏', label: 'Pressure', value: '2 in' },
    { icon: '💧', label: 'Humidity', value: '83%' },
    { icon: '💨', label: 'Wind (mph)', value: '6.9 mph' },
    { icon: '☀️', label: 'Sunrise', value: '07:10 AM' },
    { icon: '🌑', label: 'Sunset', value: '06:30 PM ' },
  ];

  forecast: any[] = [
    {
      day: 'Wednesday',
      icon: '☀️',
      temp: '73.3',
      low: '65.3',
      high: '85.5',
      highlighted: true,
    },
    {
      day: 'Thursday',
      icon: '☁️',
      temp: '69',
      low: '60.6',
      high: '71.6',
      highlighted: false,
    },
    {
      day: 'Friday',
      icon: '⛅',
      temp: '58.1',
      low: '49.6',
      high: '68.2',
      highlighted: false,
    },
  ];

  ngOnInit(): void {
    // this.dateBlock();
  }

  toggleTemperatureUnit() {
    this.isCelsius = !this.isCelsius;
    console.log(this.isCelsius);
    this.convertFToC();
  }

  convertFToC() {
    switch (this.isCelsius) {
      case true:
        this.convertToCelsius();
        this.notify.show('Converted to Celsius Successfully', 'success', 2000);
        break;
      case false:
        this.convertToFahrenheit();
        this.notify.show(
          'Converted to Fahrenheit Successfully',
          'success',
          2000
        );
        break;
      default:
        throw new Error('Invalid temperature unit state');
    }
  }

  private convertToFahrenheit() {
    this.currentTemp = this.toFixed(
      this.fahrenheitToCelsius(parseFloat(this.currentTemp))
    );
    this.maxCurrentTemp = this.toFixed(
      this.fahrenheitToCelsius(parseFloat(this.maxCurrentTemp))
    );
    this.minCurrentTemp = this.toFixed(
      this.fahrenheitToCelsius(parseFloat(this.minCurrentTemp))
    );
    this.forecast = this.forecast.map((day) => ({
      ...day,
      temp: this.toFixed(this.celsiusToFahrenheit(parseFloat(day.temp))),
      low: this.toFixed(this.celsiusToFahrenheit(parseFloat(day.low))),
      high: this.toFixed(this.celsiusToFahrenheit(parseFloat(day.high))),
    }));

    // Convert weather details
    this.weatherDetails[0].value =
      this.toFixed(
        this.celsiusToFahrenheit(parseFloat(this.weatherDetails[0].value))
      ) + '°';
  }

  private convertToCelsius() {
    this.currentTemp = this.toFixed(
      this.celsiusToFahrenheit(parseFloat(this.currentTemp))
    );
    this.maxCurrentTemp = this.toFixed(
      this.celsiusToFahrenheit(parseFloat(this.maxCurrentTemp))
    );
    this.minCurrentTemp = this.toFixed(
      this.celsiusToFahrenheit(parseFloat(this.minCurrentTemp))
    );
    this.forecast = this.forecast.map((day) => ({
      ...day,
      temp: this.toFixed(this.fahrenheitToCelsius(parseFloat(day.temp))),
      low: this.toFixed(this.fahrenheitToCelsius(parseFloat(day.low))),
      high: this.toFixed(this.fahrenheitToCelsius(parseFloat(day.high))),
    }));

    // Convert weather details
    this.weatherDetails[0].value =
      this.toFixed(
        this.fahrenheitToCelsius(parseFloat(this.weatherDetails[0].value))
      ) + '°';
  }

  // Conversion utility functions
  private fahrenheitToCelsius(fahrenheit: number): number {
    return (fahrenheit - 32) / 1.8;
  }

  private celsiusToFahrenheit(celsius: number): number {
    return celsius * 1.8 + 32;
  }

  private toFixed(value: number, decimals: number = 1): string {
    return value.toFixed(decimals);
  }

  loadWeatherData() {
    const param = {
      city: this.location,
      lang: 'EN',
    };

    const header = {
      'x-rapidapi-host': env.Host,
      'x-rapidapi-key': env.API_KEY,
    };

    this.loader.show('Weather Data Loading...');

    this.fetcher.get('city', param, header, true).subscribe({
      next: (res: any) => {
        if (res) {
          console.log(res);
          if (
            res['weather'] &&
            res['weather'].length &&
            res['weather'][0].description
          ) {
            this.weatherCondition = res['weather'][0].description;
          }
          if (res['main']) {
            if (res['main'].temp) {
              this.currentTemp = this.toFixed(res['main'].temp);
            }
            if (res['main'].temp_max) {
              this.maxCurrentTemp = this.toFixed(res['main'].temp_max);
            }
            if (res['main'].temp_min) {
              this.minCurrentTemp = this.toFixed(res['main'].temp_min);
            }
          }

          this.weatherDetails[0].value = this.toFixed(res['main'].feels_like);
          this.weatherDetails[1].value = res['main'].pressure + ' in';
          this.weatherDetails[2].value = res['main'].humidity + '%';
          this.weatherDetails[3].value = res['wind'].speed + ' mph';
          this.weatherDetails[4].value = this.getTimeFormated(
            res['sys'].sunrise,
            res['timezone']
          );
          this.weatherDetails[5].value = this.getTimeFormated(
            res['sys'].sunset,
            res['timezone']
          );

          this.loader.hide();
        }
      },
      error: (err: Error) => {
        this.loader.hide();
        console.error(err);
      },
    });
  }

  cityEntered() {
    console.log(this.location);
    this.loadWeatherData();
  }

  dateBlock() {
    // let myDate = new Date();
    // console.log('myDate');
    // console.log(myDate);
    // console.log(typeof myDate);
    // console.log('toDateString');
    // console.log(myDate.toDateString());
    // console.log(typeof myDate.toDateString());
    // console.log('toISOString');
    // console.log(myDate.toISOString());
    // console.log(typeof myDate.toISOString());
    // console.log('toJSON');
    // console.log(myDate.toJSON());
    // console.log(typeof myDate.toJSON());
    // console.log('toLocaleDateString');
    // console.log(myDate.toLocaleDateString());
    // console.log(typeof myDate.toLocaleDateString());
    // console.log('toLocaleString');
    // console.log(myDate.toLocaleString());
    // console.log(typeof myDate.toLocaleString());
    // console.log('toLocaleTimeString');
    // console.log(myDate.toLocaleTimeString());
    // console.log(typeof myDate.toLocaleTimeString());
    // console.log('toTimeString');
    // console.log(myDate.toTimeString());
    // console.log(typeof myDate.toTimeString());
    // console.log('toUTCString');
    // console.log(myDate.toUTCString());
    // console.log(typeof myDate.toUTCString());
    // let myCreatedDate = new Date(2023, 0 ,23);
    // let myCreatedDate = new Date(2023, 0 ,23, 13, 33, 3);
    // let myCreatedDate = new Date("07-27-1998");
    // console.log(myCreatedDate.toLocaleString());
    // let myTimeStamp = Date.now();
    // console.log(myTimeStamp);
    // let myDateTime = new Date('11-29-2025').getTime();
    // console.log(myDateTime);
    // console.log(new Date().getMonth());
    // console.log(new Date().getDay());
  }

  getTimeFormated(epochSeconds: any, timezoneOffset: number): string {
    // Calculate the actual time at the location
    const milliseconds = (epochSeconds + timezoneOffset) * 1000;
    const date = new Date(milliseconds);

    // Use UTC methods since we've already adjusted for timezone
    let hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12 || 12;

    return `${hours}:${String(minutes).padStart(2, '0')} ${ampm}`;
  }
}
