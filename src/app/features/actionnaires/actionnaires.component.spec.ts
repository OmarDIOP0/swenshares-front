import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionnairesComponent } from './actionnaires.component';

describe('ActionnairesComponent', () => {
  let component: ActionnairesComponent;
  let fixture: ComponentFixture<ActionnairesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActionnairesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActionnairesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
