import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ImageLocationService {
  private apiUrl = 'http://localhost:5000/predict'; // Update with your API URL

  constructor(private http: HttpClient) { }

  uploadImage(image: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', image);

    return this.http.post<any>(this.apiUrl, formData);
  }
}
