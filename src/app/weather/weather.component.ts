import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {WeatherService} from '../_service/weather.service';
import {debounceTime} from 'rxjs/operators';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {
  weatherUrl = 'https://api.openweathermap.org/data/2.5/weather';
  apiKey = '0887a6ce526907cc80121d591e5adbdd';
  weatherIconUrl = 'https://openweathermap.org/img/w/';
  cityName = 'London';
  data;
  temp: number;
  description: string;
  icon: string;
  error = null;
  metric = 'metric';

  constructor(private http: HttpClient,
              private weatherService: WeatherService) {
  }

  ngOnInit(): void {
    this.getCityData();
  }

  getCityData() {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('q', this.cityName);
    queryParams = queryParams.append('units', this.metric);
    queryParams = queryParams.append('appid', this.apiKey);
    this.http.get(this.weatherUrl, {params: queryParams})
      .pipe(debounceTime(500))
      .subscribe(data => {
        this.data = data;
        this.temp = Math.round(this.data.main.temp);
        this.description = this.data.weather[0].description;
        this.icon = this.weatherIconUrl + this.data.weather[0].icon + '.png';
        this.error = null;
        console.log(data);
      }, error => {
        this.error = error;
      });
  }
}
