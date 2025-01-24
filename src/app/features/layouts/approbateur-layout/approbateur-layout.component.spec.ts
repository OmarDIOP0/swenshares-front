import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprobateurLayoutComponent } from './approbateur-layout.component';

describe('ApprobateurLayoutComponent', () => {
  let component: ApprobateurLayoutComponent;
  let fixture: ComponentFixture<ApprobateurLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApprobateurLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApprobateurLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
