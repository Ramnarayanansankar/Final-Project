import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {

  constructor(private http: HttpClient){}
  getGreenEnergy() {
    return this.http.get('http://localhost:3000/api/greenEnergy');
  }

  getRecentinnovations() {
    return this.http.get<IRecentinnovations[]>('http://localhost:3000/api/recentinnovations');
  }
}
export interface IRecentinnovations {
  tech: String;
  expense: number;
}
