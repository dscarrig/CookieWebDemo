import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModifyAddressComponent } from './modify-address.component';

describe('ModifyAddressComponent', () => {
  let component: ModifyAddressComponent;
  let fixture: ComponentFixture<ModifyAddressComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifyAddressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
