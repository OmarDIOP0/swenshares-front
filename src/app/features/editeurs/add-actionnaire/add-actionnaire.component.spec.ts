import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddActionnaireComponent } from './add-actionnaire.component';

describe('AddActionnaireComponent', () => {
  let component: AddActionnaireComponent;
  let fixture: ComponentFixture<AddActionnaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddActionnaireComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddActionnaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
