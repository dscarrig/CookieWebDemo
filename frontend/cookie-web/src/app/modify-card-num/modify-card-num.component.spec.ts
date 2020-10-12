import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyCardNumComponent } from './modify-card-num.component';

describe('ModifyCardNumComponent', () => {
  let component: ModifyCardNumComponent;
  let fixture: ComponentFixture<ModifyCardNumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifyCardNumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyCardNumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
