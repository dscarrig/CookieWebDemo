import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ListtodoComponent } from './listtodo.component';

describe('ListtodoComponent', () => {
  let component: ListtodoComponent;
  let fixture: ComponentFixture<ListtodoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ListtodoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListtodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
