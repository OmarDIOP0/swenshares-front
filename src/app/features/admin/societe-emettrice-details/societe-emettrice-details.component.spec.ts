import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocieteEmettriceDetailsComponent } from './societe-emettrice-details.component';

describe('SocieteEmettriceDetailsComponent', () => {
  let component: SocieteEmettriceDetailsComponent;
  let fixture: ComponentFixture<SocieteEmettriceDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SocieteEmettriceDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SocieteEmettriceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
