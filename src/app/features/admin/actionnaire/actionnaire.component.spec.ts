import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionnaireComponent } from './actionnaire.component';

describe('ActionnaireComponent', () => {
  let component: ActionnaireComponent;
  let fixture: ComponentFixture<ActionnaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActionnaireComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActionnaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
