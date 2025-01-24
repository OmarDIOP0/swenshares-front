import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionApprobateurComponent } from './transaction-approbateur.component';

describe('TransactionApprobateurComponent', () => {
  let component: TransactionApprobateurComponent;
  let fixture: ComponentFixture<TransactionApprobateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionApprobateurComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionApprobateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
