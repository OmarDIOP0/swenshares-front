import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocieteEmettriceComponent } from './societe-emettrice.component';

describe('SocieteEmettriceComponent', () => {
  let component: SocieteEmettriceComponent;
  let fixture: ComponentFixture<SocieteEmettriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SocieteEmettriceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SocieteEmettriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
