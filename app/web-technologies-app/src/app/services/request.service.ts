import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: Http) { }

  // Geocode location from address
  geocodeAddress(address) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:5000/incidents/geocode/' + address, { headers: headers })
    .pipe(map((response: any) => response.json()));
  }

  // Create incident in the database
  lodgeIncident(newIncident) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:5000/incidents/lodge', newIncident, { headers: headers })
    .pipe(map((response: any) => response.json()));
  }

}
