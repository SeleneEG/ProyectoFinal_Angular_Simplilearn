import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditQuizzComponent } from './edit-quizz.component';

describe('EditQuizzComponent', () => {
  let component: EditQuizzComponent;
  let fixture: ComponentFixture<EditQuizzComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditQuizzComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditQuizzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
