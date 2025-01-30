import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskbyIdComponent } from './taskby-id.component';

describe('TaskbyIdComponent', () => {
  let component: TaskbyIdComponent;
  let fixture: ComponentFixture<TaskbyIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskbyIdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskbyIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
