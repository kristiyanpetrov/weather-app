import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  weatherApi = 'http://api.openweathermap.org/data/2.5/weather?q=';
  apiKey = '&units=metric&appid=0887a6ce526907cc80121d591e5adbdd';
  city = 'london';

  constructor(private http: HttpClient) {
  }

  weatherData() {
    const url = `${this.weatherApi}${this.city}${this.apiKey}`;
    return this.http.get(url, {});
  }
}
