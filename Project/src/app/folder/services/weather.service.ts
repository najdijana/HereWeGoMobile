import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiUrl = 'https://api.open-meteo.com/v1/forecast';

constructor(private http: HttpClient) {}

getWeather(latitude: number, longitude: number): Observable<any> {
  const params = {
    latitude: latitude.toString(),
    longitude: longitude.toString(),
    hourly: 'temperature_2m,weather_code', // Request weather_code
    };
  return this.http.get<any>(this.apiUrl, { params });
}
}
