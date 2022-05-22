import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriedFoodComponent } from './dried-food.component';

describe('DriedFoodComponent', () => {
  let component: DriedFoodComponent;
  let fixture: ComponentFixture<DriedFoodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriedFoodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DriedFoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
