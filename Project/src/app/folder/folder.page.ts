import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { AuthService } from '../shared/services/auth.service';
import { Observable } from 'rxjs';
import { User } from 'firebase/auth';
import Swiper from 'swiper';
import { SwiperOptions } from 'swiper/types';
import { WeatherService } from './services/weather.service';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})

export class FolderPage implements OnInit {
  public folder!: string;
  private activatedRoute = inject(ActivatedRoute);
  weatherData: any;

  @ViewChild('swiper') swiper: Swiper;

  swiperConfig: SwiperOptions = {
    slidesPerView: 1.3, // Show one full card and a part of the second one
    spaceBetween: 4,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  };

  constructor( 
     private modalController: ModalController,
     public auth:AuthService,
     private weatherService: WeatherService,) {}

     weatherCondition: string = '';
     weatherIcon: string = '';

  openExternalUrl(url: string) {
    window.open(url, '_blank');
  }
  ngAfterViewInit() {
    this.swiper = new Swiper('.swiper-container', this.swiperConfig);
  }
  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
    console.log('id', this.folder);
    
    const latitude = 33.8886;
    const longitude = 35.4955;

    this.weatherService.getWeather(latitude, longitude).subscribe(
      (data) => {
        this.weatherData = data;
        this.weatherCondition = this.getWeatherCondition(data.hourly.weather_code[0]);
        this.weatherIcon = this.getWeatherIcon(data.hourly.weather_code[0]);
        console.log(this.weatherData);
      },
      (error) => {
        console.error('Error fetching weather data', error);
      }
    );
  }
  getWeatherCondition(code: number): string {
    // Map weather code to weather condition
    switch (code) {
      case 0: return 'Clear sky';
      case 1: return 'Mainly clear';
      case 2: return 'Partly cloudy';
      case 3: return 'Overcast';
      case 45: return 'Fog';
      case 48: return 'Depositing rime fog';
      case 51: return 'Drizzle: Light';
      case 53: return 'Drizzle: Moderate';
      case 55: return 'Drizzle: Dense intensity';
      case 56: return 'Freezing Drizzle: Light';
      case 57: return 'Freezing Drizzle: Dense intensity';
      case 61: return 'Rain: Slight';
      case 63: return 'Rain: Moderate';
      case 65: return 'Rain: Heavy intensity';
      case 66: return 'Freezing Rain: Light';
      case 67: return 'Freezing Rain: Heavy intensity';
      case 71: return 'Snow fall: Slight';
      case 73: return 'Snow fall: Moderate';
      case 75: return 'Snow fall: Heavy intensity';
      case 77: return 'Snow grains';
      case 80: return 'Rain showers: Slight';
      case 81: return 'Rain showers: Moderate';
      case 82: return 'Rain showers: Violent';
      case 85: return 'Snow showers: Slight';
      case 86: return 'Snow showers: Heavy';
      case 95: return 'Thunderstorm: Slight or moderate';
      case 96: return 'Thunderstorm with slight hail';
      case 99: return 'Thunderstorm with heavy hail';
      default: return 'Unknown weather condition';
    }
  }

  getWeatherIcon(code: number): string {
    // Map weather code to weather icon
    switch (code) {
      case 0: return 'sunny-outline';
      case 1: return 'partly-sunny-outline';
      case 2: return 'cloudy-outline';
      case 3: return 'cloud-outline';
      case 45:
      case 48: return 'cloudy-night-outline';
      case 51:
      case 53:
      case 55:
      case 56:
      case 57:
      case 61:
      case 63:
      case 65:
      case 66:
      case 67: return 'rainy-outline';
      case 71:
      case 73:
      case 75:
      case 77:
      case 85:
      case 86: return 'snow-outline';
      case 80:
      case 81:
      case 82: return 'thunderstorm-outline';
      case 95:
      case 96:
      case 99: return 'thunderstorm-outline';
      default: return 'cloud-outline';
    }
  }
 
  async openChatbot() {
    const modal = await this.modalController.create({
      component: ChatbotComponent,
    });
    return await modal.present();
  }
}
