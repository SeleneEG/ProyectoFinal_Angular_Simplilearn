import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserQuizzComponent } from './user-quizz.component';

describe('UserQuizzComponent', () => {
  let component: UserQuizzComponent;
  let fixture: ComponentFixture<UserQuizzComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserQuizzComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserQuizzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
