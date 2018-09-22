import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LodgeIncidentComponent } from './lodge-incident.component';

describe('LodgeIncidentComponent', () => {
  let component: LodgeIncidentComponent;
  let fixture: ComponentFixture<LodgeIncidentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LodgeIncidentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LodgeIncidentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
