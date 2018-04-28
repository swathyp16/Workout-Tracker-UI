import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartEndWorkoutComponent } from './start-end-workout.component';

describe('StartEndWorkoutComponent', () => {
  let component: StartEndWorkoutComponent;
  let fixture: ComponentFixture<StartEndWorkoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartEndWorkoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartEndWorkoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
