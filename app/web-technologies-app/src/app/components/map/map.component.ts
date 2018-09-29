import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // Google API would load before initMap() and cause issues
    // Script placed in here to ensure initMap() is loaded before googleapi
    const mapAPI = document.createElement('script');
    mapAPI.type = 'text/javascript';
    mapAPI.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyA3WcMmbKLsf8BVqZDhnj56Gxak1JsKGsg&callback=initMap`;
    document.head.appendChild(mapAPI);

    window.initMap = function() {
      const map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -33.8688, lng: 151.2093},
        zoom: 12,
        mapTypeControl: false,
        streetViewControl: false,
      });
    };
  }
}
