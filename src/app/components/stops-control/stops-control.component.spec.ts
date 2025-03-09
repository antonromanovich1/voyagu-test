import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StopsControlComponent } from './stops-control.component';

describe('StopsControlComponent', () => {
  let component: StopsControlComponent;
  let fixture: ComponentFixture<StopsControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StopsControlComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StopsControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
