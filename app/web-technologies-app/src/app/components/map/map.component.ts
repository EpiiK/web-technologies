import { Component , OnInit, NgModule, NgZone, ElementRef, ViewChild } from '@angular/core';
import { AgmMap, MapsAPILoader } from '@agm/core';
import { RequestService } from '../../services/request.service';
import {} from '@types/googlemaps';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  protected map: any;
  // Array to hold incident markers
  markers =  [];
  // initial center position for the map
  lat = -33.865143;
  lng = 151.209900;
  zoom = 14;

  @ViewChild('searchLocation')
  public searchElementRef: ElementRef;

  @ViewChild(AgmMap)
  public agmMap: AgmMap;

  constructor(private mapsAPILoader: MapsAPILoader,
              private ngZone: NgZone,
              private requestService: RequestService) { }

    // Solution to run map functions
    // Called in map.component.html on map ready
    protected mapReady(map) {
    this.map = map;
  }

  ngOnInit() {
    // Initalise markers
    this.updateMarkers();
    navigator.geolocation.getCurrentPosition((position) => {
      this.lat = position.coords.latitude;
      this.lng = position.coords.longitude;
    });

    // Google Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);

      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          // get the place result
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();

          // verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          this.lat = place.geometry.location.lat();
          this.lng = place.geometry.location.lng();
          this.updateMarkers();
        });
      });
    });
  }

  updateMarkers() {
    this.requestService.getMarkers(this.lat, this.lng).subscribe((response) => {
      if (response.success) {
        this.markers = response.markers;
        console.log(this.markers);

        this.markers.forEach(function(value, key) {

          //
          // TODO implement a better way of assigning icons
          //

          switch (value.alertType) {
            case 'Police investigation':
              value.iconUrl = '../../assets/police.png';
              break;
            case 'Building fire':
              value.iconUrl = '../../assets/fire.png';
              break;
            case 'Car accident':
              value.iconUrl = '../../assets/caraccident.png';
              break;
            default:
              value.iconUrl = '../../assets/question.png';
          }
        });
      } else {
        alert(response.message);
      }
    });
  }

  clickedMarker() {
    console.log('CLICKED');
  }
}
