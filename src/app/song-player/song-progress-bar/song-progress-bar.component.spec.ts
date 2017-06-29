import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SongProgressBarComponent } from './song-progress-bar.component';

describe('SongProgressBarComponent', () => {
  let component: SongProgressBarComponent;
  let fixture: ComponentFixture<SongProgressBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SongProgressBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SongProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
