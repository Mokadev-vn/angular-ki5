import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormMonsterComponent } from './form-monster.component';

describe('FormMonsterComponent', () => {
  let component: FormMonsterComponent;
  let fixture: ComponentFixture<FormMonsterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormMonsterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormMonsterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
