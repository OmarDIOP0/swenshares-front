import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionnaireApprobateurComponent } from './actionnaire-approbateur.component';

describe('ActionnaireApprobateurComponent', () => {
  let component: ActionnaireApprobateurComponent;
  let fixture: ComponentFixture<ActionnaireApprobateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActionnaireApprobateurComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActionnaireApprobateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
