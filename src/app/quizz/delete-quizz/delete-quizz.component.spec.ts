import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteQuizzComponent } from './delete-quizz.component';

describe('DeleteQuizzComponent', () => {
  let component: DeleteQuizzComponent;
  let fixture: ComponentFixture<DeleteQuizzComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteQuizzComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteQuizzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
