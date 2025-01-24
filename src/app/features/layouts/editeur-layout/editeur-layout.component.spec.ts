import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditeurLayoutComponent } from './editeur-layout.component';

describe('EditeurLayoutComponent', () => {
  let component: EditeurLayoutComponent;
  let fixture: ComponentFixture<EditeurLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditeurLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditeurLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
