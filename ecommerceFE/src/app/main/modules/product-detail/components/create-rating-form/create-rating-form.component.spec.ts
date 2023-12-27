import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRatingFormComponent } from './create-rating-form.component';

describe('CreateRatingFormComponent', () => {
  let component: CreateRatingFormComponent;
  let fixture: ComponentFixture<CreateRatingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateRatingFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRatingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
