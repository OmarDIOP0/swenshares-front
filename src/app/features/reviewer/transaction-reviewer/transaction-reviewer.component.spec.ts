import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionReviewerComponent } from './transaction-reviewer.component';

describe('TransactionReviewerComponent', () => {
  let component: TransactionReviewerComponent;
  let fixture: ComponentFixture<TransactionReviewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionReviewerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionReviewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
