import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TakeQuizzPageComponent } from './take-quizz-page.component';

describe('TakeQuizzPageComponent', () => {
  let component: TakeQuizzPageComponent;
  let fixture: ComponentFixture<TakeQuizzPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TakeQuizzPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TakeQuizzPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
