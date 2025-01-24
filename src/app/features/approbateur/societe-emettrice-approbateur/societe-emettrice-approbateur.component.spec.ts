import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocieteEmettriceApprobateurComponent } from './societe-emettrice-approbateur.component';

describe('SocieteEmettriceApprobateurComponent', () => {
  let component: SocieteEmettriceApprobateurComponent;
  let fixture: ComponentFixture<SocieteEmettriceApprobateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SocieteEmettriceApprobateurComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SocieteEmettriceApprobateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
