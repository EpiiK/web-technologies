import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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

  constructor() { }

  ngOnInit() {
    this.incidentForm = new FormGroup({
      type: new FormControl('', Validators.required),
      location: new FormControl('', Validators.required),
      description: new FormControl('')
    });
  }

  onSubmit(formValues) {
    console.log(formValues);
  }

}
