import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionnaireViewDetailApprobateurComponent } from './actionnaire-view-detail-approbateur.component';

describe('ActionnaireViewDetailApprobateurComponent', () => {
  let component: ActionnaireViewDetailApprobateurComponent;
  let fixture: ComponentFixture<ActionnaireViewDetailApprobateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActionnaireViewDetailApprobateurComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActionnaireViewDetailApprobateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
