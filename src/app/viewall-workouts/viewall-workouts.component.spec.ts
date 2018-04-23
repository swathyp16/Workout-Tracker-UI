import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewallWorkoutsComponent } from './viewall-workouts.component';

describe('ViewallWorkoutsComponent', () => {
  let component: ViewallWorkoutsComponent;
  let fixture: ComponentFixture<ViewallWorkoutsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewallWorkoutsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewallWorkoutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
