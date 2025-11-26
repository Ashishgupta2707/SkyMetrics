import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-weather',
  imports: [FormsModule],
  templateUrl: './weather.html',
  styleUrl: './weather.scss',
})
export class Weather {
  isCelsius = false;
  location = '';
  currentDate = '11/26/2025';
  currentTemp : string = '79';
  weatherCondition = 'Sunny';

  weatherDetails: any[] = [
    { icon: '🌡️', label: 'Feels Like', value: '82.5°' },
    { icon: '🌧️', label: 'Chance of Rain', value: '0%' },
    { icon: '💧', label: 'Humidity', value: '83%' },
    { icon: '💨', label: 'Wind (mph)', value: '6.9' },
    { icon: '☀️', label: 'UV', value: '0.9' },
    { icon: '❄️', label: 'Chance of Snow', value: '0%' }
  ];

  forecast: any[] = [
    { day: 'Wednesday', icon: '☀️', temp: '73.3', low: '65.3', high: '85.5', highlighted: true },
    { day: 'Thursday', icon: '☁️', temp: '69', low: '60.6', high: '71.6', highlighted: false },
    { day: 'Friday', icon: '⛅', temp: '58.1', low: '49.6', high: '68.2', highlighted: false }
  ];

  toggleTemperatureUnit() {
    this.isCelsius = !this.isCelsius;
    console.log(this.isCelsius);
    this.convertFToC();
  }

  convertFToC(){
    switch(this.isCelsius) {
      case true:
        this.convertToCelsius();
        break;
      case false:
        this.convertToFahrenheit();
        break;
      default:
        throw new Error('Invalid temperature unit state');
    }
  }

  private convertToFahrenheit() {
    this.currentTemp = this.toFixed(this.fahrenheitToCelsius(parseFloat(this.currentTemp)));
    this.forecast = this.forecast.map(day => ({
      ...day,
      temp: this.toFixed(this.celsiusToFahrenheit(parseFloat(day.temp))),
      low: this.toFixed(this.celsiusToFahrenheit(parseFloat(day.low))),
      high: this.toFixed(this.celsiusToFahrenheit(parseFloat(day.high)))
    }));
    
    // Convert weather details
    this.weatherDetails[0].value = this.toFixed(this.celsiusToFahrenheit(parseFloat(this.weatherDetails[0].value))) + '°';
  }
  
  private convertToCelsius() {
    this.currentTemp = this.toFixed(this.celsiusToFahrenheit(parseFloat(this.currentTemp)));
    this.forecast = this.forecast.map(day => ({
      ...day,
      temp: this.toFixed(this.fahrenheitToCelsius(parseFloat(day.temp))),
      low: this.toFixed(this.fahrenheitToCelsius(parseFloat(day.low))),
      high: this.toFixed(this.fahrenheitToCelsius(parseFloat(day.high)))
    }));
    
    // Convert weather details
    this.weatherDetails[0].value = this.toFixed(this.fahrenheitToCelsius(parseFloat(this.weatherDetails[0].value))) + '°';
  }
  
  // Conversion utility functions
  private fahrenheitToCelsius(fahrenheit: number): number {
    return (fahrenheit - 32) / 1.8;
  }
  
  private celsiusToFahrenheit(celsius: number): number {
    return (celsius * 1.8) + 32;
  }
  
  private toFixed(value: number, decimals: number = 1): string {
    return value.toFixed(decimals);
  }

  cityEntered(){
    console.log(this.location);
  }
}
