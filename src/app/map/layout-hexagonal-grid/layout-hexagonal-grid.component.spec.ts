import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutHexagonalGridComponent } from './layout-hexagonal-grid.component';

describe('LayoutHexagonalGridComponent', () => {
  let component: LayoutHexagonalGridComponent;
  let fixture: ComponentFixture<LayoutHexagonalGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutHexagonalGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutHexagonalGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
