import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormComicComponent } from './form-comic.component';

describe('FormComicComponent', () => {
  let component: FormComicComponent;
  let fixture: ComponentFixture<FormComicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormComicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
