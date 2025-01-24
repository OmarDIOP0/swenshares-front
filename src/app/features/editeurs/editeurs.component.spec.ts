import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditeursComponent } from './editeurs.component';

describe('EditeursComponent', () => {
  let component: EditeursComponent;
  let fixture: ComponentFixture<EditeursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditeursComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditeursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
