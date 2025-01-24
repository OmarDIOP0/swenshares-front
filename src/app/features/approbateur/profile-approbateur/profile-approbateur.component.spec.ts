import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileApprobateurComponent } from './profile-approbateur.component';

describe('ProfileApprobateurComponent', () => {
  let component: ProfileApprobateurComponent;
  let fixture: ComponentFixture<ProfileApprobateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileApprobateurComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileApprobateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
