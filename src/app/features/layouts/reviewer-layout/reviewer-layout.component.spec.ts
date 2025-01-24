import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewerLayoutComponent } from './reviewer-layout.component';

describe('ReviewerLayoutComponent', () => {
  let component: ReviewerLayoutComponent;
  let fixture: ComponentFixture<ReviewerLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewerLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewerLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
