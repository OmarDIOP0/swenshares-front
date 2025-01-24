import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionnaireReviewerComponent } from './actionnaire-reviewer.component';

describe('ActionnaireReviewerComponent', () => {
  let component: ActionnaireReviewerComponent;
  let fixture: ComponentFixture<ActionnaireReviewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActionnaireReviewerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActionnaireReviewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
