import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SongItemsComponent } from './song-items.component';

describe('SongItemsComponent', () => {
  let component: SongItemsComponent;
  let fixture: ComponentFixture<SongItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SongItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SongItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
