import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSocieteEmettriceComponent } from './add-societe-emettrice.component';

describe('AddSocieteEmettriceComponent', () => {
  let component: AddSocieteEmettriceComponent;
  let fixture: ComponentFixture<AddSocieteEmettriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddSocieteEmettriceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSocieteEmettriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
