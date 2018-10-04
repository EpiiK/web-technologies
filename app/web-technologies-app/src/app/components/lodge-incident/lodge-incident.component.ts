import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RequestService } from '../../services/request.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

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

  constructor(
    private requestService: RequestService,
    private router: Router,
    private authService: AuthService
  ) { }

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
      formValues.reportedBy = this.authService.user.name;
      this.requestService.lodgeIncident(formValues).subscribe((response) => {
        if (response.success) {
          alert(response.message);
          this.router.navigate(['']);
        } else {
          alert(response.message);
        }
      });
    });
  }

}
