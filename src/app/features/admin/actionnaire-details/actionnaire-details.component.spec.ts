import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionnaireDetailsComponent } from './actionnaire-details.component';

describe('ActionnaireDetailsComponent', () => {
  let component: ActionnaireDetailsComponent;
  let fixture: ComponentFixture<ActionnaireDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActionnaireDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActionnaireDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
