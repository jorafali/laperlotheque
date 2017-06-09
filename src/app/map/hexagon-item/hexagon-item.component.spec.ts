import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HexagonItemComponent } from './hexagon-item.component';

describe('HexagonItemComponent', () => {
  let component: HexagonItemComponent;
  let fixture: ComponentFixture<HexagonItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HexagonItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HexagonItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
