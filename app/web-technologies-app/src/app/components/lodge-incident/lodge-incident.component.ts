import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RequestService } from '../../services/request.service';

@Component({
  selector: 'app-lodge-incident',
  templateUrl: './lodge-incident.component.html',
  styleUrls: ['./lodge-incident.component.css']
})
export class LodgeIncidentComponent implements OnInit {
  incidentForm;

  types = [
    'Car accident',
    'Bush fire',
    'Building fire',
    'Police investigation'
  ];

  constructor(private requestService: RequestService) { }

  ngOnInit() {
    this.incidentForm = new FormGroup({
      type: new FormControl('', Validators.required),
      location: new FormControl('', Validators.required),
      description: new FormControl('')
    });
  }

  onSubmit(formValues) {
    console.log(formValues);
    this.requestService.geocodeAddress(formValues.location).subscribe((location) => {
      formValues.latitude = location.lat;
      formValues.longitude = location.lng;
      formValues.reportedBy = 'Andrew';
      this.requestService.lodgeIncident(formValues).subscribe((response) => {
        if (response.success) {
          alert(response.message);
        } else {
          alert(response.message);
        }
      });
    });
  }

}
