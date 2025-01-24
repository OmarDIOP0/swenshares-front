import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewlayoutComponent } from './viewlayout.component';

describe('ViewlayoutComponent', () => {
  let component: ViewlayoutComponent;
  let fixture: ComponentFixture<ViewlayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewlayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewlayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
